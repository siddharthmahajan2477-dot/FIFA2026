import httpx
from typing import Any, Dict
from backend.app.core.config import settings
from backend.app.integrations.schemas import IntegrationResponse
import logging

logger = logging.getLogger(__name__)

class AnalyticsService:
    def __init__(self):
        self.measurement_id = settings.GOOGLE_ANALYTICS_ID
        self.api_secret = settings.GA_API_SECRET
        self.base_url = "https://www.google-analytics.com/mp/collect"

    async def track_event(self, client_id: str, event_name: str, params: Dict[str, Any] = None) -> IntegrationResponse[Any]:
        """Send an event to Google Analytics 4 via Measurement Protocol."""
        if not self.measurement_id or not self.api_secret:
            logger.warning("Google Analytics credentials not set. Skipping event tracking.")
            return IntegrationResponse(success=False, provider="ga4", cached=False, error="Credentials not set")

        payload = {
            "client_id": client_id,
            "events": [{
                "name": event_name,
                "params": params or {}
            }]
        }

        url = f"{self.base_url}?measurement_id={self.measurement_id}&api_secret={self.api_secret}"

        try:
            async with httpx.AsyncClient(timeout=5.0) as client:
                response = await client.post(url, json=payload)
                response.raise_for_status()
                return IntegrationResponse(success=True, provider="ga4", cached=False, data={"status": "sent"})
        except Exception as e:
            logger.error(f"Failed to send GA4 event: {e}")
            return IntegrationResponse(success=False, provider="ga4", cached=False, error=str(e))
