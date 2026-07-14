import firebase_admin
from firebase_admin import messaging
from typing import Any, List, Dict
from backend.app.integrations.schemas import IntegrationResponse
from backend.app.integrations.exceptions import IntegrationError
import logging

logger = logging.getLogger(__name__)

class FirebaseNotificationService:
    def __init__(self):
        pass # Relies on the global firebase_admin initialization

    async def send_to_device(self, token: str, title: str, body: str, data: Dict[str, str] = None) -> IntegrationResponse[Any]:
        """Send a notification to a specific device."""
        try:
            message = messaging.Message(
                notification=messaging.Notification(
                    title=title,
                    body=body,
                ),
                data=data or {},
                token=token,
            )
            response = messaging.send(message)
            return IntegrationResponse(success=True, provider="firebase_fcm", cached=False, data={"message_id": response})
        except Exception as e:
            logger.error(f"Failed to send Firebase notification: {e}")
            return IntegrationResponse(success=False, provider="firebase_fcm", cached=False, error=str(e))

    async def send_to_topic(self, topic: str, title: str, body: str, data: Dict[str, str] = None) -> IntegrationResponse[Any]:
        """Send a notification to a PubSub topic."""
        try:
            message = messaging.Message(
                notification=messaging.Notification(
                    title=title,
                    body=body,
                ),
                data=data or {},
                topic=topic,
            )
            response = messaging.send(message)
            return IntegrationResponse(success=True, provider="firebase_fcm", cached=False, data={"message_id": response})
        except Exception as e:
            logger.error(f"Failed to send Firebase topic notification: {e}")
            return IntegrationResponse(success=False, provider="firebase_fcm", cached=False, error=str(e))
