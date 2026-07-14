import asyncio
from backend.app.tasks.celery_app import celery_app
from backend.app.integrations.football.service import FootballService
from backend.app.integrations.weather.service import WeatherService
from backend.app.integrations.cache import clear_cache
import logging

logger = logging.getLogger(__name__)

@celery_app.task(name="backend.app.tasks.integration_tasks.warm_football_standings")
def warm_football_standings(league_id: int, season: int):
    """Periodically fetches standings to ensure cache remains warm for real-time APIs."""
    logger.info(f"Warming football standings cache for league {league_id} season {season}")
    service = FootballService()
    
    # We must clear the specific cache key first to force a fresh fetch
    cache_key = f"football:standings:{league_id}:{season}"
    
    async def _fetch():
        await clear_cache(cache_key)
        await service.get_standings(league_id=league_id, season=season)
        
    asyncio.run(_fetch())

@celery_app.task(name="backend.app.tasks.integration_tasks.warm_stadium_weather")
def warm_stadium_weather(lat: float, lon: float):
    """Periodically fetches weather to ensure cache remains warm."""
    logger.info(f"Warming weather cache for location {lat}, {lon}")
    service = WeatherService()
    
    cache_key = f"weather:stadium:{lat}:{lon}"
    
    async def _fetch():
        await clear_cache(cache_key)
        await service.get_stadium_weather(lat=lat, lon=lon)
        
    asyncio.run(_fetch())
