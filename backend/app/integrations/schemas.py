from typing import Generic, TypeVar, Any, Optional
from pydantic import BaseModel, Field
import datetime

T = TypeVar('T')

class IntegrationResponse(BaseModel, Generic[T]):
    """
    Standard Response Format for all external integration services.
    Ensures the frontend never communicates directly with external APIs
    and relies on a unified response schema.
    """
    success: bool = Field(..., description="Whether the operation was successful")
    provider: str = Field(..., description="The name of the backend provider used (e.g. 'api_football', 'google_genai')")
    cached: bool = Field(..., description="Whether this response was served from cache")
    timestamp: datetime.datetime = Field(default_factory=lambda: datetime.datetime.now(datetime.timezone.utc), description="UTC timestamp of the response")
    data: Optional[T] = Field(None, description="The generic payload data")
    error: Optional[str] = Field(None, description="Error message if success is False")
