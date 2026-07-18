from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import or_, and_

from backend.app.core.database import get_db_session as get_db
from backend.app.models.auth.models import User, Role, UserRole
from backend.app.models.users.models import UserProfile
from backend.app.middleware.auth import get_current_user, require_permissions
from backend.app.services.audit import log_audit_event
from backend.app.services.admin_service import list_users as admin_list_users, update_user_status as admin_update_user_status, assign_user_role as admin_assign_user_role
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
    return await admin_list_users(skip=skip, limit=limit, search=search, db=db)

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
    return await admin_update_user_status(user_uuid=user_uuid, is_active=payload.is_active, current_user=current_user, db=db)

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
    return await admin_assign_user_role(user_uuid=user_uuid, role_name=payload.role_name, current_user=current_user, db=db)
