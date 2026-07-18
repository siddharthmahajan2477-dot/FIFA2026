from fastapi import APIRouter, Response, status
from backend.app.database.database import check_db_health
from backend.app.core.redis_client import check_redis_health
from backend.app.core.logging import logger
from backend.app.core.config import settings
import json
from backend.app.services.health_service import (
    check_gemini_health,
    check_firebase_health,
    check_external_api_health,
    get_full_health_components,
)

router = APIRouter()





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
