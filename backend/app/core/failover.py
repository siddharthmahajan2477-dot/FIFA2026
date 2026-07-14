"""
Provider Failover & Retry Logic
FIFA World Cup 2026 Smart Stadium Operating System

Wraps any async service call with automatic retry and optional
fallback-provider switching on repeated failures.
"""

from __future__ import annotations

import asyncio
import logging
from functools import wraps
from typing import Any, Callable, Optional, Type

logger = logging.getLogger(__name__)


def with_retry(
    max_attempts: int = 3,
    delay_seconds: float = 1.0,
    backoff: float = 2.0,
    exceptions: tuple[Type[Exception], ...] = (Exception,),
) -> Callable:
    """
    Async retry decorator with exponential back-off.

    Usage
    -----
    @with_retry(max_attempts=3, delay_seconds=0.5)
    async def fetch_fixtures() -> list:
        ...
    """

    def decorator(func: Callable) -> Callable:
        @wraps(func)
        async def wrapper(*args: Any, **kwargs: Any) -> Any:
            attempt = 0
            wait = delay_seconds
            while attempt < max_attempts:
                try:
                    return await func(*args, **kwargs)
                except exceptions as exc:
                    attempt += 1
                    if attempt >= max_attempts:
                        logger.error(
                            "All %d attempts failed for '%s': %s",
                            max_attempts,
                            func.__qualname__,
                            exc,
                        )
                        raise
                    logger.warning(
                        "Attempt %d/%d failed for '%s': %s. Retrying in %.1fs …",
                        attempt,
                        max_attempts,
                        func.__qualname__,
                        exc,
                        wait,
                    )
                    await asyncio.sleep(wait)
                    wait *= backoff

        return wrapper

    return decorator


def with_fallback(
    primary_factory: Callable,
    fallback_factory: Callable,
    max_primary_attempts: int = 2,
) -> Callable:
    """
    Decorator that switches to a fallback provider after
    `max_primary_attempts` consecutive failures on the primary.

    Usage
    -----
    @with_fallback(
        primary_factory=lambda: OpenWeatherProvider(),
        fallback_factory=lambda: WeatherAPIProvider(),
    )
    async def get_weather(lat, lon):
        ...
    """

    def decorator(func: Callable) -> Callable:
        @wraps(func)
        async def wrapper(*args: Any, **kwargs: Any) -> Any:
            for attempt in range(max_primary_attempts):
                try:
                    provider = primary_factory()
                    return await func(provider, *args, **kwargs)
                except Exception as exc:
                    logger.warning(
                        "Primary provider attempt %d failed for '%s': %s",
                        attempt + 1,
                        func.__qualname__,
                        exc,
                    )
            # Primary exhausted — switch to fallback
            logger.error(
                "Primary provider exhausted for '%s'. Switching to fallback.",
                func.__qualname__,
            )
            fallback = fallback_factory()
            return await func(fallback, *args, **kwargs)

        return wrapper

    return decorator
