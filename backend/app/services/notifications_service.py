from typing import List, Dict, Any

async def get_notifications(db) -> List[Dict[str, Any]]:
    """Return mock notifications list."""
    return [
        {"id": "n1", "title": "Gate Opening Alert", "message": "Gate A turnstiles are now open for Match 14 entry.", "type": "info", "read": False, "timestamp": "10 mins ago"},
        {"id": "n2", "title": "Weather Warning", "message": "Humidity spike expected at 20:00. Crowd Comfort Index stays Optimal.", "type": "warning", "read": False, "timestamp": "25 mins ago"},
        {"id": "n3", "title": "Ticket Confirmed", "message": "Your Category 1 ticket for Quarter-Final 1 has been issued.", "type": "success", "read": True, "timestamp": "2 hours ago"},
    ]

async def mark_notification_as_read(notification_id: str, db) -> Dict[str, Any]:
    """Mock marking a notification as read."""
    return {"status": "success", "marked_id": notification_id}

async def clear_all_notifications(db) -> Dict[str, Any]:
    """Mock clearing all notifications."""
    return {"status": "success", "message": "All notifications cleared"}
