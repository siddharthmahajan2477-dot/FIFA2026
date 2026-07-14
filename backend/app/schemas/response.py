import datetime
from pydantic import BaseModel
from typing import Generic, TypeVar, Optional, Any

T = TypeVar("T")

class BaseResponse(BaseModel, Generic[T]):
    """
    Universal API Response Envelope structure for FIFA World Cup 2026 Smart Stadium OS.
    """
    success: bool
    message: str
    data: Optional[T] = None
    timestamp: str
    request_id: str
