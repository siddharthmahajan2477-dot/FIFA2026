from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import or_, and_

from backend.app.core.database import get_db_session as get_db
from backend.app.models.auth.models import User, Role, UserRole
from backend.app.models.users.models import UserProfile
from backend.app.middleware.auth import get_current_user, require_permissions
from backend.app.services.audit import log_audit_event
from pydantic import BaseModel

router = APIRouter()

class UserStatusUpdate(BaseModel):
    is_active: bool

class UserRoleUpdate(BaseModel):
    role_name: str

@router.get("/users")
async def list_users(
    skip: int = 0,
    limit: int = 50,
    search: str | None = None,
    current_user: User = Depends(require_permissions(["manage_users"])),
    db: AsyncSession = Depends(get_db)
):
    """
    List users with optional search.
    """
    stmt = select(User)
    
    if search:
        search_filter = f"%{search}%"
        stmt = stmt.join(UserProfile, User.id == UserProfile.user_id, isouter=True).filter(
            or_(
                User.email.ilike(search_filter),
                User.username.ilike(search_filter),
                UserProfile.display_name.ilike(search_filter)
            )
        )
        
    stmt = stmt.offset(skip).limit(limit)
    result = await db.execute(stmt)
    users = result.scalars().all()
    
    response = []
    for u in users:
        # Note: In a production app with thousands of users, eager load profile and roles 
        # in the main query rather than querying inside the loop. This is simplified.
        profile_res = await db.execute(select(UserProfile).filter(UserProfile.user_id == u.id))
        profile = profile_res.scalars().first()
        
        role_res = await db.execute(select(UserRole.role_id).filter(UserRole.user_id == u.id))
        role_ids = role_res.scalars().all()
        primary_role = "Fan"
        if role_ids:
            r_res = await db.execute(select(Role).filter(Role.id == role_ids[0]))
            r = r_res.scalars().first()
            if r:
                primary_role = r.name
                
        response.append({
            "id": str(u.uuid),
            "email": u.email,
            "username": u.username,
            "display_name": profile.display_name if profile else None,
            "role": primary_role,
            "is_active": u.is_active,
            "is_verified": u.is_verified
        })
        
    return response

@router.put("/users/{user_uuid}/status")
async def update_user_status(
    user_uuid: str,
    payload: UserStatusUpdate,
    current_user: User = Depends(require_permissions(["manage_users"])),
    db: AsyncSession = Depends(get_db)
):
    """
    Ban, suspend, or activate a user.
    """
    result = await db.execute(select(User).filter(User.uuid == user_uuid))
    target_user = result.scalars().first()
    
    if not target_user:
        raise HTTPException(status_code=404, detail="User not found")
        
    target_user.is_active = payload.is_active
    
    await log_audit_event(
        db=db,
        action="user_ban" if not payload.is_active else "user_activate",
        user_id=current_user.id,
        entity_type="User",
        entity_id=target_user.id,
        details={"is_active": payload.is_active}
    )
    
    await db.commit()
    return {"status": "success", "message": f"User status updated to {'active' if payload.is_active else 'suspended'}."}

@router.put("/users/{user_uuid}/roles")
async def assign_user_role(
    user_uuid: str,
    payload: UserRoleUpdate,
    current_user: User = Depends(require_permissions(["manage_users"])),
    db: AsyncSession = Depends(get_db)
):
    """
    Assign a new role to the user.
    """
    result = await db.execute(select(User).filter(User.uuid == user_uuid))
    target_user = result.scalars().first()
    
    if not target_user:
        raise HTTPException(status_code=404, detail="User not found")
        
    role_result = await db.execute(select(Role).filter(Role.name.ilike(payload.role_name)))
    new_role = role_result.scalars().first()
    
    if not new_role:
        raise HTTPException(status_code=400, detail=f"Role '{payload.role_name}' does not exist.")
        
    # Remove existing roles (Simplified: Assuming 1 primary role for this endpoint)
    await db.execute(UserRole.__table__.delete().where(UserRole.user_id == target_user.id))
    
    # Assign new role
    db.add(UserRole(user_id=target_user.id, role_id=new_role.id))
    
    await log_audit_event(
        db=db,
        action="role_change",
        user_id=current_user.id,
        entity_type="User",
        entity_id=target_user.id,
        details={"new_role": new_role.name}
    )
    
    await db.commit()
    return {"status": "success", "message": f"Role '{new_role.name}' assigned successfully."}
