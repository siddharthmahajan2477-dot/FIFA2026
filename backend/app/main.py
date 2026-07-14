from contextlib import asynccontextmanager
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.middleware.gzip import GZipMiddleware

from backend.app.core.config import settings
from backend.app.core.logging import setup_logging, logger
from backend.app.core.exceptions import register_exception_handlers
from backend.app.middleware.request_id import RequestIdMiddleware
from backend.app.middleware.logging import RequestLoggingMiddleware
from backend.app.middleware.rate_limit import RateLimitMiddleware
from backend.app.middleware.security_headers import SecurityHeadersMiddleware
from backend.app.api.v1 import v1_router
from backend.app.realtime.manager import room_manager

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Handles application startup and shutdown events.
    """
    # ── Startup Tasks ──
    setup_logging(level="DEBUG" if settings.DEBUG else "INFO")
    logger.info("==================================================================")
    logger.info("🚀 Starting FIFA World Cup 2026 Smart Stadium Operating System API")
    logger.info("==================================================================")
    
    yield
    
    # ── Shutdown Tasks ──
    logger.info("==================================================================")
    logger.info("🛑 Shutting down FIFA World Cup 2026 Smart Stadium OS Services")
    logger.info("==================================================================")

# Create FastAPI app instance
app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Enterprise API Core Backend Foundation for FIFA World Cup 2026 Smart Stadium Operating System. Supports real-time telemetries, command dispatches, maps routing, and AI copilot agents.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan,
    contact={
        "name": "FIFA IT Operations Command",
        "email": "operations@fifa.org"
    },
    license_info={
        "name": "Proprietary Commercial License"
    }
)

# ── Register Global Exception Handlers ──
register_exception_handlers(app)

# ── Register Middlewares (Order is important - innermost executed first) ──
# 1. Custom Request ID Middleware
app.add_middleware(RequestIdMiddleware)

# 2. Custom Logger Context Middleware
app.add_middleware(RequestLoggingMiddleware)

# 3. Security Headers Middleware
app.add_middleware(SecurityHeadersMiddleware)

# 4. GZip Response Compression
app.add_middleware(GZipMiddleware, minimum_size=1000)

# 5. Trusted Host validation
app.add_middleware(TrustedHostMiddleware, allowed_hosts=settings.ALLOWED_HOSTS)

# 6. Rate Limit Placeholders
app.add_middleware(RateLimitMiddleware)

# 7. Standard CORS headers
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Register Versioned API Routers ──
app.include_router(v1_router, prefix=settings.API_V1_STR)

@app.get("/")
def read_root():
    """
    Root endpoint returning basic deployment environment metadata.
    """
    return {
        "title": settings.PROJECT_NAME,
        "api_docs": "/docs",
        "status": "online",
        "api_version": "1.0.0"
    }

# ── Realtime WebSocket endpoint handler ──
@app.websocket("/ws/{room}")
async def websocket_endpoint(websocket: WebSocket, room: str):
    """
    Robust WebSocket route supporting Redis Pub/Sub dispatches and Ping/Pong heartbeats.
    """
    await room_manager.connect(websocket, room)
    try:
        while True:
            # Wait for text from the client (e.g. heartbeat ping)
            data = await websocket.receive_text()
            if data == "ping":
                await websocket.send_text("pong")
    except WebSocketDisconnect:
        logger.info(f"Client disconnected from room {room}")
    except Exception as e:
        logger.warning(f"Error handling WebSocket message in room {room}: {str(e)}")
    finally:
        await room_manager.disconnect(websocket, room)
