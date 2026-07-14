from fastapi import APIRouter, Response, status
from backend.app.database.database import check_db_health
from backend.app.core.redis_client import check_redis_health
from backend.app.core.logging import logger
from backend.app.core.config import settings
import httpx
from google import genai
import firebase_admin
from firebase_admin import App as FirebaseApp

router = APIRouter()

async def check_gemini_health() -> bool:
    try:
        if not settings.GOOGLE_GENAI_API_KEY:
            return False
        client = genai.Client(api_key=settings.GOOGLE_GENAI_API_KEY)
        return client is not None
    except Exception as e:
        logger.error(f"Gemini health check failed: {e}")
        return False

async def check_firebase_health() -> bool:
    try:
        # Check if the default app is initialized
        app: FirebaseApp = firebase_admin.get_app()
        return app is not None
    except ValueError:
        # App is not initialized
        return False
    except Exception as e:
        logger.error(f"Firebase health check failed: {e}")
        return False

async def check_external_api_health() -> bool:
    try:
        # Ping the football API to ensure external internet egress works
        async with httpx.AsyncClient(timeout=3.0) as client:
            res = await client.get("https://v3.football.api-sports.io/status", headers={"x-apisports-key": settings.FOOTBALL_API_KEY})
            return res.status_code == 200
    except Exception as e:
        logger.error(f"External API health check failed: {e}")
        return False

@router.get("/health")
def get_health():
    """
    Basic liveness probe. 
    Returns 200 OK immediately if the HTTP server is accepting requests.
    """
    return {
        "status": "healthy",
        "service": "Stadium OS API",
    }

@router.get("/health/database")
async def get_db_health():
    """
    Checks connection health to the PostgreSQL database.
    """
    is_ok = await check_db_health()
    if not is_ok:
        return Response(
            content='{"status": "unreachable"}',
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            media_type="application/json"
        )
    return {
        "status": "healthy",
        "service": "PostgreSQL",
    }

@router.get("/health/redis")
async def get_redis_health():
    """
    Checks connection health to the Redis cache.
    """
    is_ok = await check_redis_health()
    if not is_ok:
        return Response(
            content='{"status": "unreachable"}',
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            media_type="application/json"
        )
    return {
        "status": "healthy",
        "service": "Redis",
    }

@router.get("/health/full")
async def get_full_health():
    """
    Comprehensive readiness probe testing all external dependencies.
    """
    db_ok = await check_db_health()
    redis_ok = await check_redis_health()
    gemini_ok = await check_gemini_health()
    firebase_ok = await check_firebase_health()
    external_api_ok = await check_external_api_health()
    
    components = {
        "postgresql": "healthy" if db_ok else "unreachable",
        "redis": "healthy" if redis_ok else "unreachable",
        "gemini": "healthy" if gemini_ok else "unreachable",
        "firebase": "healthy" if firebase_ok else "unreachable",
        "external_apis": "healthy" if external_api_ok else "unreachable",
    }
    
    # Only return fully healthy if ALL critical components are up
    overall_ok = db_ok and redis_ok and firebase_ok
    overall_status = "healthy" if overall_ok else "degraded"
    
    response_code = status.HTTP_200_OK if overall_ok else status.HTTP_503_SERVICE_UNAVAILABLE
    
    return Response(
        content=f'{{"status": "{overall_status}", "components": {components}}}'.replace("'", '"'),
        status_code=response_code,
        media_type="application/json"
    )
