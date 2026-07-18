from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.services.notifications_service import get_notifications as notifications_get, mark_notification_as_read as notifications_mark_read, clear_all_notifications as notifications_clear
from backend.app.core.database import get_db_session as get_db

router = APIRouter()

@router.get("/")
async def get_notifications(db: AsyncSession = Depends(get_db)):
    """Retrieve user notifications via service layer."""
    return await notifications_get(db)

@router.post("/mark-as-read")
async def mark_notification_as_read(notification_id: str, db: AsyncSession = Depends(get_db)):
    """Mark a notification as read via service layer."""
    return await notifications_mark_read(notification_id, db)

@router.post("/clear-all")
async def clear_all_notifications(db: AsyncSession = Depends(get_db)):
    """Clear all notifications via service layer."""
    return await notifications_clear(db)
