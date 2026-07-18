from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from backend.app.core.database import get_db_session as get_db
from backend.app.models.auth.models import User
from backend.app.models.users.models import UserProfile, NotificationPreference
from backend.app.middleware.auth import get_current_user
from backend.app.services.users_service import get_my_profile, update_my_profile, update_my_preferences
from pydantic import BaseModel

router = APIRouter()

class ProfileUpdateRequest(BaseModel):
    display_name: str | None = None
    country: str | None = None
    language: str | None = None

class PreferencesUpdateRequest(BaseModel):
    email_updates: bool | None = None
    push_notifications: bool | None = None
    sms_alerts: bool | None = None

@router.get("/me")
async def get_my_profile(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Return current user's profile and roles via service layer."""
    return await get_my_profile(current_user, db)

@router.put("/me")
async def update_my_profile(
    payload: ProfileUpdateRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Update current user's profile via service layer."""
    return await update_my_profile(current_user, payload, db)

@router.put("/me/preferences")
async def update_my_preferences(
    payload: PreferencesUpdateRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Update current user's preferences via service layer."""
    return await update_my_preferences(current_user, payload, db)
