import datetime
import logging
from typing import Any
from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
from sqlalchemy.exc import SQLAlchemyError
from backend.app.core.logging import request_id_var

logger = logging.getLogger("stadium_os.exceptions")

def create_response_envelope(success: bool, message: str, data: Any = None) -> dict:
    """
    Builds standard universal JSON envelope payload structure.
    Never exposes internal stack traces to the client.
    """
    return {
        "success": success,
        "message": message,
        "data": data,
        "timestamp": datetime.datetime.utcnow().isoformat() + "Z",
        "request_id": request_id_var.get()
    }

async def validation_exception_handler(request: Request, exc: RequestValidationError) -> JSONResponse:
    # Filter validation errors to remove potentially sensitive backend structure details
    sanitized_errors = [{"loc": err.get("loc"), "msg": err.get("msg"), "type": err.get("type")} for err in exc.errors()]
    logger.warning(f"Request validation failed: {sanitized_errors}")
    envelope = create_response_envelope(
        success=False,
        message="Request parameters or body schema validation failed.",
        data=sanitized_errors
    )
    return JSONResponse(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, content=envelope)

async def http_exception_handler(request: Request, exc: StarletteHTTPException) -> JSONResponse:
    logger.warning(f"HTTP exception occurred: [{exc.status_code}] {exc.detail}")
    envelope = create_response_envelope(
        success=False,
        message=str(exc.detail)
    )
    return JSONResponse(status_code=exc.status_code, content=envelope)

async def database_exception_handler(request: Request, exc: SQLAlchemyError) -> JSONResponse:
    # Log the full stack trace internally, but return a generic 500
    logger.error(f"Database statement execution failed", exc_info=exc)
    envelope = create_response_envelope(
        success=False,
        message="An internal data service error occurred."
    )
    return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content=envelope)

async def generic_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    # Log the full stack trace internally, but return a generic 500
    logger.error(f"Unhandled application exception intercepted", exc_info=exc)
    envelope = create_response_envelope(
        success=False,
        message="An unexpected system error occurred. Please contact support."
    )
    return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content=envelope)

def register_exception_handlers(app: FastAPI) -> None:
    """
    Registers exception handlers globally to override default FastAPI error structures.
    """
    app.add_exception_handler(RequestValidationError, validation_exception_handler)
    app.add_exception_handler(StarletteHTTPException, http_exception_handler)
    app.add_exception_handler(SQLAlchemyError, database_exception_handler)
    app.add_exception_handler(Exception, generic_exception_handler)
