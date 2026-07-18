from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from backend.app.models.auth.models import User
from backend.app.models.users.models import UserProfile, NotificationPreference

# Helper to fetch profile
async def _get_profile(user: User, db: AsyncSession) -> UserProfile:
    result = await db.execute(select(UserProfile).where(UserProfile.user_id == user.id))
    profile = result.scalars().first()
    if not profile:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User profile not found")
    return profile

# Public service functions
async def get_my_profile(current_user: User, db: AsyncSession):
    """Return the current user's profile and preferences."""
    profile = await _get_profile(current_user, db)
    # Ensure preferences are loaded
    await db.refresh(profile, attribute_names=["notification_preferences"])
    return {
        "id": current_user.id,
        "email": current_user.email,
        "display_name": current_user.display_name,
        "country": current_user.country,
        "language": current_user.language,
        "profile": {
            "first_name": profile.first_name,
            "last_name": profile.last_name,
            "phone_number": profile.phone_number,
        },
        "preferences": {
            "email_updates": profile.notification_preferences.email_updates,
            "push_notifications": profile.notification_preferences.push_notifications,
            "sms_updates": profile.notification_preferences.sms_updates,
        },
    }

async def update_my_profile(current_user: User, payload, db: AsyncSession):
    """Update mutable profile fields for the current user."""
    profile = await _get_profile(current_user, db)
    for attr in ["first_name", "last_name", "phone_number"]:
        if hasattr(payload, attr) and getattr(payload, attr) is not None:
            setattr(profile, attr, getattr(payload, attr))
    db.add(profile)
    await db.commit()
    await db.refresh(profile)
    return {"status": "success", "detail": "Profile updated"}

async def update_my_preferences(current_user: User, payload, db: AsyncSession):
    """Update notification preferences for the current user."""
    profile = await _get_profile(current_user, db)
    prefs = profile.notification_preferences
    if not prefs:
        prefs = NotificationPreference(profile_id=profile.id)
    for attr in ["email_updates", "push_notifications", "sms_updates"]:
        if hasattr(payload, attr) and getattr(payload, attr) is not None:
            setattr(prefs, attr, getattr(payload, attr))
    db.add(prefs)
    await db.commit()
    await db.refresh(prefs)
    return {"status": "success", "detail": "Preferences updated"}
