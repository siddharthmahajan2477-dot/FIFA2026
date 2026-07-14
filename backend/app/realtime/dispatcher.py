import json
import datetime
from typing import Any, Dict
from backend.app.core.logging import logger
from backend.app.integrations.cache import redis_client

class EventDispatcher:
    """
    Centralized event dispatcher for Real-time Smart Stadium updates.
    Publishes JSON serialized events to Redis Pub/Sub channels.
    """
    
    @staticmethod
    async def publish_event(room: str, event_type: str, payload: Dict[str, Any]) -> None:
        """
        Publishes a broadcast event to a specific room.
        
        :param room: The room/channel name (e.g. 'fan_dashboard', 'match_center')
        :param event_type: Constant identifying the event (e.g. 'GOAL_SCORED')
        :param payload: The data dictionary to send to clients
        """
        try:
            message = {
                "type": event_type,
                "timestamp": datetime.datetime.now(datetime.timezone.utc).isoformat(),
                "data": payload
            }
            # Serialize JSON
            message_str = json.dumps(message)
            
            # Publish to Redis channel (prefix with 'stadium_ws:' to avoid collisions)
            channel_name = f"stadium_ws:{room}"
            receivers = await redis_client.publish(channel_name, message_str)
            logger.debug(f"Dispatched {event_type} to {room} ({receivers} listeners)")
        except Exception as e:
            logger.error(f"Failed to dispatch event {event_type} to {room}: {e}")

event_dispatcher = EventDispatcher()
