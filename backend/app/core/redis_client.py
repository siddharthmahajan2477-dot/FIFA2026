from typing import AsyncGenerator
import redis.asyncio as aioredis
from backend.app.core.config import settings
from backend.app.core.logging import logger

# Initialize Redis client using settings
redis_client: Optional[aioredis.Redis] = None

def get_redis_client() -> aioredis.Redis:
    """
    Returns a configured aioredis.Redis client instance, initializing the connection pool if necessary.
    """
    global redis_client
    if redis_client is None:
        redis_client = aioredis.from_url(
            settings.REDIS_URL,
            encoding="utf-8",
            decode_responses=True,
            max_connections=50
        )
    return redis_client

async def check_redis_health() -> bool:
    """
    Verifies Redis connection health by sending a PING command.
    """
    client = get_redis_client()
    try:
        await client.ping()
        return True
    except Exception as e:
        logger.error(f"Redis connection health check failed: {str(e)}")
        return False

async def get_redis() -> AsyncGenerator[aioredis.Redis, None]:
    """
    FastAPI dependency injection provider for Redis operations.
    """
    client = get_redis_client()
    yield client
