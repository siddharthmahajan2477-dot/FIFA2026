import json
from typing import Any, Optional
from backend.app.core.redis_client import get_redis_client

# Global redis client pool (shared)
redis_client = get_redis_client()

async def get_cache(key: str) -> Optional[Any]:
    """Retrieve an item from Redis and deserialize it."""
    data = await redis_client.get(key)
    if data:
        try:
            return json.loads(data)
        except json.JSONDecodeError:
            return data
    return None

async def set_cache(key: str, value: Any, ttl_seconds: int = 300) -> None:
    """Serialize and store an item in Redis with a TTL."""
    if isinstance(value, (dict, list)):
        value = json.dumps(value)
    await redis_client.setex(key, ttl_seconds, value)

async def clear_cache(key_pattern: str) -> None:
    """Clear cached items matching a specific pattern."""
    keys = await redis_client.keys(key_pattern)
    if keys:
        await redis_client.delete(*keys)
