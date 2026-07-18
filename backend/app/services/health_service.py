import logging
from fastapi import status, Response
from backend.app.core.config import settings
from backend.app.core.logging import logger
from backend.app.database.database import check_db_health
from backend.app.core.redis_client import check_redis_health
import httpx
from google import genai
import firebase_admin
from firebase_admin import App as FirebaseApp


async def check_gemini_health() -> bool:
    """Verify connectivity to Google Gemini API."""
    try:
        if not settings.GOOGLE_GENAI_API_KEY:
            return False
        client = genai.Client(api_key=settings.GOOGLE_GENAI_API_KEY)
        return client is not None
    except Exception as e:
        logger.error(f"Gemini health check failed: {e}")
        return False


async def check_firebase_health() -> bool:
    """Check that Firebase app is initialized and reachable."""
    try:
        app: FirebaseApp = firebase_admin.get_app()
        return app is not None
    except ValueError:
        return False
    except Exception as e:
        logger.error(f"Firebase health check failed: {e}")
        return False


async def check_external_api_health() -> bool:
    """Ping the external football API to ensure internet egress works."""
    try:
        async with httpx.AsyncClient(timeout=3.0) as client:
            res = await client.get(
                "https://v3.football.api-sports.io/status",
                headers={"x-apisports-key": settings.FOOTBALL_API_KEY},
            )
            return res.status_code == 200
    except Exception as e:
        logger.error(f"External API health check failed: {e}")
        return False


async def get_full_health_components() -> dict:
    """Run all health checks and return a dict of component statuses.

    Returns a dict with keys:
    - postgresql, redis, gemini, firebase, external_apis (each 'healthy' or 'unreachable')
    - overall_ok (bool) indicating if critical services are up.
    """
    db_ok = await check_db_health()
    redis_ok = await check_redis_health()
    gemini_ok = await check_gemini_health()
    firebase_ok = await check_firebase_health()
    external_api_ok = await check_external_api_health()
    return {
        "postgresql": "healthy" if db_ok else "unreachable",
        "redis": "healthy" if redis_ok else "unreachable",
        "gemini": "healthy" if gemini_ok else "unreachable",
        "firebase": "healthy" if firebase_ok else "unreachable",
        "external_apis": "healthy" if external_api_ok else "unreachable",
        "overall_ok": db_ok and redis_ok and firebase_ok,
    }
