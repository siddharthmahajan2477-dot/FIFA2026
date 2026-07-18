import pytest

from backend.app.services.notifications_service import (
    get_notifications,
    mark_notification_as_read,
    clear_all_notifications,
)

@pytest.mark.asyncio
async def test_get_notifications():
    result = await get_notifications(db=None)
    assert isinstance(result, list)
    assert len(result) == 3
    for notif in result:
        assert "id" in notif and "title" in notif

@pytest.mark.asyncio
async def test_mark_notification_as_read():
    notif_id = "n1"
    result = await mark_notification_as_read(notif_id, db=None)
    assert result["status"] == "success"
    assert result["marked_id"] == notif_id

@pytest.mark.asyncio
async def test_clear_all_notifications():
    result = await clear_all_notifications(db=None)
    assert result["status"] == "success"
    assert "message" in result
