from fastapi import APIRouter, Depends, Request
from backend.app.middleware.auth import get_current_user
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from backend.app.core.database import get_db_session as get_db
from backend.app.models.auth.models import User
from backend.app.schemas.schemas import UserSyncRequest, UserSyncResponse
from backend.app.services.auth_service import (
    check_username as auth_check_username,
    sync_user_profile as auth_sync_user_profile,
    logout_user as auth_logout_user,
)

router = APIRouter()
security = HTTPBearer(auto_error=False)

@router.get("/check-username")
async def check_username(username: str, db: AsyncSession = Depends(get_db)):
    """Check username availability."""
    return await auth_check_username(username, db)

@router.post("/sync", response_model=UserSyncResponse)
async def sync_user_profile(
    profile_in: UserSyncRequest,
    request: Request,
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: AsyncSession = Depends(get_db),
):
    """Synchronize Firebase user with DB."""
    return await auth_sync_user_profile(profile_in, request, credentials, db)

@router.post("/logout")
async def logout(
    request: Request,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Logout current user and invalidate sessions."""
    return await auth_logout_user(request, current_user, db)
