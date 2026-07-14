import time
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response, JSONResponse
from backend.app.integrations.cache import redis_client
from backend.app.core.logging import logger

class RateLimitMiddleware(BaseHTTPMiddleware):
    """
    Redis-backed rate limiter enforcing enterprise traffic throttling parameters.
    """
    def __init__(self, app, max_requests: int = 150, window_seconds: int = 60):
        super().__init__(app)
        self.max_requests = max_requests
        self.window_seconds = window_seconds

    async def dispatch(self, request: Request, call_next) -> Response:
        # Skip rate limiting for static assets or docs if necessary
        if request.url.path.startswith("/docs") or request.url.path.startswith("/redoc"):
            return await call_next(request)

        # Identify client by IP (or potentially user ID in a real system)
        client_ip = request.client.host if request.client else "unknown"
        redis_key = f"rate_limit:{client_ip}"
        
        try:
            # Atomic increment
            current_count = await redis_client.incr(redis_key)
            if current_count == 1:
                await redis_client.expire(redis_key, self.window_seconds)
            
            remaining = max(0, self.max_requests - current_count)
            reset_time = await redis_client.ttl(redis_key)
            if reset_time < 0:
                reset_time = self.window_seconds
                
            if current_count > self.max_requests:
                logger.warning(f"Rate limit exceeded for IP {client_ip}")
                return JSONResponse(
                    status_code=429,
                    content={"detail": "Too Many Requests. Please retry later."},
                    headers={
                        "Retry-After": str(reset_time),
                        "X-RateLimit-Limit": str(self.max_requests),
                        "X-RateLimit-Remaining": "0",
                        "X-RateLimit-Reset": str(reset_time)
                    }
                )

            # Proceed if within limit
            response = await call_next(request)
            
            # Inject tracking headers
            response.headers["X-RateLimit-Limit"] = str(self.max_requests)
            response.headers["X-RateLimit-Remaining"] = str(remaining)
            response.headers["X-RateLimit-Reset"] = str(reset_time)
            return response
            
        except Exception as e:
            # If Redis fails, log it and let the request pass (fail-open strategy for resilience)
            logger.error(f"Rate Limiter Redis Error: {e}")
            return await call_next(request)
