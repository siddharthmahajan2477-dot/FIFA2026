from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Dict, Any
from backend.app.database.session import get_db_session as get_db

router = APIRouter()

@router.get("/")
async def get_notifications(db: AsyncSession = Depends(get_db)):
    """Retrieve user notifications and system broadcast alerts."""
    return [
        {"id": "n1", "title": "Gate Opening Alert", "message": "Gate A turnstiles are now open for Match 14 entry.", "type": "info", "read": False, "timestamp": "10 mins ago"},
        {"id": "n2", "title": "Weather Warning", "message": "Humidity spike expected at 20:00. Crowd Comfort Index stays Optimal.", "type": "warning", "read": False, "timestamp": "25 mins ago"},
        {"id": "n3", "title": "Ticket Confirmed", "message": "Your Category 1 ticket for Quarter-Final 1 has been issued.", "type": "success", "read": True, "timestamp": "2 hours ago"}
    ]

@router.post("/mark-as-read")
async def mark_notification_as_read(notification_id: str, db: AsyncSession = Depends(get_db)):
    """Mark a notification as read."""
    return {"status": "success", "marked_id": notification_id}

@router.post("/clear-all")
async def clear_all_notifications(db: AsyncSession = Depends(get_db)):
    """Clear all read notifications."""
    return {"status": "success", "message": "All notifications cleared"}
