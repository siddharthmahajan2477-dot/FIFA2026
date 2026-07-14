from fastapi import APIRouter
from backend.app.api.v1.auth.router import router as auth_router
from backend.app.api.v1.users.router import router as users_router
from backend.app.api.v1.admin.router import router as admin_router
from backend.app.api.v1.matches.router import router as matches_router
from backend.app.api.v1.tickets.router import router as tickets_router
from backend.app.api.v1.analytics.router import router as analytics_router
from backend.app.api.v1.operations.router import router as operations_router
from backend.app.api.v1.infrastructure.router import router as infrastructure_router
from backend.app.api.v1.notifications.router import router as notifications_router
from backend.app.api.v1.ai.router import router as ai_router
from backend.app.api.v1.health import router as health_router
from backend.app.api.v1.commerce.router import router as commerce_router
from backend.app.api.v1.navigation.router import router as navigation_router

v1_router = APIRouter()

v1_router.include_router(auth_router, prefix="/auth", tags=["auth"])
v1_router.include_router(users_router, prefix="/users", tags=["users"])
v1_router.include_router(admin_router, prefix="/admin", tags=["admin"])
v1_router.include_router(matches_router, prefix="/matches", tags=["matches"])
v1_router.include_router(tickets_router, prefix="/tickets", tags=["tickets"])
v1_router.include_router(analytics_router, prefix="/analytics", tags=["analytics"])
v1_router.include_router(operations_router, prefix="/operations", tags=["operations"])
v1_router.include_router(infrastructure_router, prefix="/infrastructure", tags=["infrastructure"])
v1_router.include_router(notifications_router, prefix="/notifications", tags=["notifications"])
v1_router.include_router(ai_router, prefix="/ai", tags=["ai"])
v1_router.include_router(health_router, prefix="/health", tags=["health"])
v1_router.include_router(commerce_router, prefix="/commerce", tags=["commerce"])
v1_router.include_router(navigation_router, prefix="/navigation", tags=["navigation"])
