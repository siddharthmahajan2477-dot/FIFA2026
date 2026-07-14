from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from backend.app.core.database import get_db_session as get_db
from backend.app.models.auth.models import User, Role, UserRole
from backend.app.models.users.models import UserProfile, NotificationPreference
from backend.app.middleware.auth import get_current_user
from backend.app.services.audit import log_audit_event
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
    """
    Returns the current user's profile and roles.
    """
    # Fetch profile
    result = await db.execute(select(UserProfile).filter(UserProfile.user_id == current_user.id))
    profile = result.scalars().first()
    
    # Fetch roles
    roles = [ur.role.name for ur in current_user.roles]
    primary_role = roles[0] if roles else "Fan"
    
    return {
        "id": str(current_user.uuid),
        "email": current_user.email,
        "username": current_user.username,
        "is_verified": current_user.is_verified,
        "role": primary_role,
        "roles": roles,
        "profile": {
            "display_name": profile.display_name if profile else None,
            "country": profile.country if profile else None,
            "language": profile.language if profile else "en",
        }
    }

@router.put("/me")
async def update_my_profile(
    payload: ProfileUpdateRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Updates the current user's profile information.
    """
    result = await db.execute(select(UserProfile).filter(UserProfile.user_id == current_user.id))
    profile = result.scalars().first()
    
    if not profile:
        profile = UserProfile(user_id=current_user.id)
        db.add(profile)
        
    if payload.display_name is not None:
        profile.display_name = payload.display_name
    if payload.country is not None:
        profile.country = payload.country
    if payload.language is not None:
        profile.language = payload.language
        
    await log_audit_event(
        db=db,
        action="profile_update",
        user_id=current_user.id,
        entity_type="UserProfile",
        entity_id=profile.id,
        details=payload.model_dump(exclude_unset=True)
    )
    
    await db.commit()
    return {"status": "success", "message": "Profile updated successfully."}

@router.put("/me/preferences")
async def update_my_preferences(
    payload: PreferencesUpdateRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Updates the current user's notification preferences.
    """
    result = await db.execute(select(NotificationPreference).filter(NotificationPreference.user_id == current_user.id))
    pref = result.scalars().first()
    
    if not pref:
        pref = NotificationPreference(user_id=current_user.id)
        db.add(pref)
        
    if payload.email_updates is not None:
        pref.email_promotions = payload.email_updates
    if payload.push_notifications is not None:
        pref.push_enabled = payload.push_notifications
    if payload.sms_alerts is not None:
        pref.sms_enabled = payload.sms_alerts
        
    await log_audit_event(
        db=db,
        action="preferences_update",
        user_id=current_user.id,
        entity_type="NotificationPreference",
        entity_id=pref.id,
        details=payload.model_dump(exclude_unset=True)
    )
    
    await db.commit()
    return {"status": "success", "message": "Preferences updated successfully."}
