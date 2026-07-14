import uuid
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response
from backend.app.core.logging import request_id_var, client_ip_var

class RequestIdMiddleware(BaseHTTPMiddleware):
    """
    Middleware to generate/propagate X-Request-ID headers and bind them to structured logging contexts.
    """
    async def dispatch(self, request: Request, call_next) -> Response:
        # Extract request ID from header or generate a new UUID
        request_id = request.headers.get("X-Request-ID") or request.headers.get("X-Request-Id") or str(uuid.uuid4())
        client_ip = request.client.host if request.client else "-"
        
        # Set context variables for logs
        token_req = request_id_var.set(request_id)
        token_ip = client_ip_var.set(client_ip)
        
        try:
            response = await call_next(request)
        finally:
            # Reset context variables
            request_id_var.reset(token_req)
            client_ip_var.reset(token_ip)
            
        # Attach request ID to response header
        response.headers["X-Request-ID"] = request_id
        return response
