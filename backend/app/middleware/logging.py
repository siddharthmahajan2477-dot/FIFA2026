import time
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response
from backend.app.core.logging import logger

class RequestLoggingMiddleware(BaseHTTPMiddleware):
    """
    Middleware to log request details, execution duration (latency), and response status codes.
    """
    async def dispatch(self, request: Request, call_next) -> Response:
        start_time = time.perf_counter()
        
        # Log request start
        method = request.method
        path = request.url.path
        query = request.url.query
        full_path = f"{path}?{query}" if query else path
        
        logger.info(f"--> Incoming Request: {method} {full_path}")
        
        try:
            response = await call_next(request)
            duration = time.perf_counter() - start_time
            logger.info(
                f"<-- Outgoing Response: {method} {path} - Status: {response.status_code} - Duration: {duration:.4f}s"
            )
            return response
        except Exception as e:
            duration = time.perf_counter() - start_time
            logger.error(
                f"!!! Unhandled Exception: {method} {path} - Error: {str(e)} - Duration: {duration:.4f}s"
            )
            raise e
