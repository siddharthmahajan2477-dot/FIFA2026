from typing import Any, Dict
from backend.app.core.config import settings
from backend.app.integrations.football.client import BaseAPIClient # Re-using base HTTP client

class OpenWeatherClient(BaseAPIClient):
    def __init__(self):
        super().__init__(
            base_url=settings.OPENWEATHER_BASE_URL,
            headers={}
        )
        self.api_key = settings.WEATHER_API_KEY
        
    async def get_weather(self, lat: float, lon: float) -> Dict[str, Any]:
        """Fetch current weather data."""
        params = {
            "lat": lat,
            "lon": lon,
            "appid": self.api_key,
            "units": "metric"
        }
        return await self.get("/weather", params=params)

    async def get_forecast(self, lat: float, lon: float) -> Dict[str, Any]:
        """Fetch 5 day / 3 hour forecast data."""
        params = {
            "lat": lat,
            "lon": lon,
            "appid": self.api_key,
            "units": "metric"
        }
        return await self.get("/forecast", params=params)
