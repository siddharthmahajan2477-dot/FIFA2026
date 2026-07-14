from typing import Any, Dict
from backend.app.integrations.weather.client import OpenWeatherClient
from backend.app.integrations.schemas import IntegrationResponse
from backend.app.integrations.exceptions import IntegrationError
from backend.app.integrations.cache import get_cache, set_cache
import logging

logger = logging.getLogger(__name__)

class WeatherService:
    def __init__(self):
        self.client = OpenWeatherClient()

    async def get_stadium_weather(self, lat: float, lon: float) -> IntegrationResponse[Any]:
        cache_key = f"weather:stadium:{lat}:{lon}"
        cached_data = await get_cache(cache_key)
        
        if cached_data:
            return IntegrationResponse(success=True, provider="cache", cached=True, data=cached_data)

        try:
            logger.info(f"Fetching current weather for {lat}, {lon}")
            current_weather = await self.client.get_weather(lat, lon)
            
            # Simplified crowd comfort index
            temp = current_weather.get("main", {}).get("temp", 20)
            humidity = current_weather.get("main", {}).get("humidity", 50)
            cci = self._calculate_cci(temp, humidity)
            
            parsed_data = {
                "temperature": temp,
                "humidity": humidity,
                "wind_speed": current_weather.get("wind", {}).get("speed"),
                "description": current_weather.get("weather", [{}])[0].get("description"),
                "crowd_comfort_index": cci,
                "heat_alert": temp > 35,
                "storm_alert": "thunderstorm" in current_weather.get("weather", [{}])[0].get("main", "").lower()
            }
            
            await set_cache(cache_key, parsed_data, ttl_seconds=300) # 5 minutes TTL
            return IntegrationResponse(success=True, provider="open_weather", cached=False, data=parsed_data)
            
        except IntegrationError as e:
            logger.error(f"Weather API failed: {e}")
            return IntegrationResponse(success=False, provider="none", cached=False, error=str(e))

    def _calculate_cci(self, temp: float, humidity: float) -> str:
        """Calculate a simplified Crowd Comfort Index (CCI) based on temp and humidity."""
        if temp > 30 and humidity > 70:
            return "Poor"
        elif temp < 10:
            return "Cold"
        elif 18 <= temp <= 25 and humidity < 60:
            return "Optimal"
        else:
            return "Fair"
