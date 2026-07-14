import json
from typing import List, Dict
from backend.app.integrations.cache import redis_client
from backend.app.core.logging import logger

class MemoryManager:
    """
    Manages short-term conversation memory backed by Redis.
    Uses sliding-window context keeping the last N messages to prevent context overflow.
    """
    def __init__(self, max_history_tokens: int = 10, ttl_seconds: int = 3600):
        self.max_messages = max_history_tokens * 2 # user + model pairs
        self.ttl = ttl_seconds

    async def get_history(self, session_id: str) -> List[Dict[str, str]]:
        """Retrieve conversation history for a given session."""
        key = f"ai_memory:{session_id}"
        try:
            data = await redis_client.get(key)
            if data:
                return json.loads(data)
            return []
        except Exception as e:
            logger.error(f"Failed to fetch AI memory for session {session_id}: {e}")
            return []

    async def append_message(self, session_id: str, role: str, content: str) -> None:
        """Appends a new message to the session's history sliding window."""
        key = f"ai_memory:{session_id}"
        try:
            history = await self.get_history(session_id)
            history.append({"role": role, "content": content})
            
            # Keep only the last max_messages
            if len(history) > self.max_messages:
                history = history[-self.max_messages:]
                
            await redis_client.setex(key, self.ttl, json.dumps(history))
        except Exception as e:
            logger.error(f"Failed to save AI memory for session {session_id}: {e}")

    async def clear_history(self, session_id: str) -> None:
        """Clears a session's memory."""
        key = f"ai_memory:{session_id}"
        await redis_client.delete(key)

memory_manager = MemoryManager()
