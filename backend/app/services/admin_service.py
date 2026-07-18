from typing import List, Dict, Any

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_

from backend.app.models.auth.models import User, Role, UserRole
from backend.app.models.users.models import UserProfile
from backend.app.services.audit import log_audit_event

async def list_users(db: AsyncSession, skip: int = 0, limit: int = 50, search: str | None = None) -> List[Dict[str, Any]]:
    """Return list of users with optional search."""
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
            "is_verified": u.is_verified,
        })
    return response

async def update_user_status(user_uuid: str, is_active: bool, current_user: User, db: AsyncSession) -> Dict[str, Any]:
    """Activate or suspend a user and log audit event."""
    result = await db.execute(select(User).filter(User.uuid == user_uuid))
    target_user = result.scalars().first()
    if not target_user:
        raise ValueError("User not found")
    target_user.is_active = is_active
    await log_audit_event(
        db=db,
        action="user_ban" if not is_active else "user_activate",
        user_id=current_user.id,
        entity_type="User",
        entity_id=target_user.id,
        details={"is_active": is_active},
    )
    await db.commit()
    return {"status": "success", "message": f"User status updated to {'active' if is_active else 'suspended'}."}

async def assign_user_role(user_uuid: str, role_name: str, current_user: User, db: AsyncSession) -> Dict[str, Any]:
    """Assign a new role to a user and log audit."""
    result = await db.execute(select(User).filter(User.uuid == user_uuid))
    target_user = result.scalars().first()
    if not target_user:
        raise ValueError("User not found")
    role_result = await db.execute(select(Role).filter(Role.name.ilike(role_name)))
    new_role = role_result.scalars().first()
    if not new_role:
        raise ValueError(f"Role '{role_name}' does not exist.")
    # Remove existing roles (simplified)
    await db.execute(UserRole.__table__.delete().where(UserRole.user_id == target_user.id))
    db.add(UserRole(user_id=target_user.id, role_id=new_role.id))
    await log_audit_event(
        db=db,
        action="role_change",
        user_id=current_user.id,
        entity_type="User",
        entity_id=target_user.id,
        details={"new_role": new_role.name},
    )
    await db.commit()
    return {"status": "success", "message": f"Role '{new_role.name}' assigned successfully."}
