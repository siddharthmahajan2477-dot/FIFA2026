from typing import Any, Dict
from backend.app.integrations.football.client import APIFootballClient, FootballDataOrgClient
from backend.app.integrations.schemas import IntegrationResponse
from backend.app.integrations.exceptions import IntegrationError
from backend.app.integrations.cache import get_cache, set_cache
import logging

logger = logging.getLogger(__name__)

class FootballService:
    def __init__(self):
        self.primary_client = APIFootballClient()
        self.secondary_client = FootballDataOrgClient()

    async def get_live_matches(self) -> IntegrationResponse[Any]:
        cache_key = "football:live_matches"
        cached_data = await get_cache(cache_key)
        
        if cached_data:
            return IntegrationResponse(success=True, provider="cache", cached=True, data=cached_data)

        try:
            # Attempt primary
            logger.info("Fetching live matches from API-Football")
            data = await self.primary_client.get("/fixtures", params={"live": "all"})
            parsed_data = self._parse_api_football(data)
            provider = "api_football"
            
        except IntegrationError as e:
            logger.warning(f"API-Football failed: {e}. Falling back to Football-Data.org")
            try:
                # Attempt secondary
                data = await self.secondary_client.get("/matches")
                parsed_data = self._parse_football_data(data)
                provider = "football_data_org"
            except IntegrationError as fallback_e:
                logger.error(f"Fallback failed: {fallback_e}")
                return IntegrationResponse(success=False, provider="none", cached=False, error="All providers failed")

        await set_cache(cache_key, parsed_data, ttl_seconds=60) # 60 seconds TTL as requested
        return IntegrationResponse(success=True, provider=provider, cached=False, data=parsed_data)

    def _parse_api_football(self, data: Dict[str, Any]) -> Any:
        # Standardize the output format for the frontend regardless of provider
        # Simplified mapping for this implementation
        return data.get("response", [])

    def _parse_football_data(self, data: Dict[str, Any]) -> Any:
        # Map football-data.org matches to the common standardized format
        return data.get("matches", [])
        
    async def get_standings(self, league_id: int, season: int) -> IntegrationResponse[Any]:
        cache_key = f"football:standings:{league_id}:{season}"
        cached_data = await get_cache(cache_key)
        if cached_data:
            return IntegrationResponse(success=True, provider="cache", cached=True, data=cached_data)

        try:
            data = await self.primary_client.get("/standings", params={"league": league_id, "season": season})
            parsed_data = self._parse_api_football(data)
            provider = "api_football"
        except IntegrationError:
            # Fallback
            data = await self.secondary_client.get(f"/competitions/{league_id}/standings")
            parsed_data = self._parse_football_data(data)
            provider = "football_data_org"
            
        await set_cache(cache_key, parsed_data, ttl_seconds=900) # 15 minutes
        return IntegrationResponse(success=True, provider=provider, cached=False, data=parsed_data)
        
    async def get_teams(self, league_id: int, season: int) -> IntegrationResponse[Any]:
        cache_key = f"football:teams:{league_id}:{season}"
        cached_data = await get_cache(cache_key)
        if cached_data:
            return IntegrationResponse(success=True, provider="cache", cached=True, data=cached_data)

        try:
            data = await self.primary_client.get("/teams", params={"league": league_id, "season": season})
            parsed_data = self._parse_api_football(data)
            provider = "api_football"
        except IntegrationError:
            data = await self.secondary_client.get(f"/competitions/{league_id}/teams")
            parsed_data = self._parse_football_data(data)
            provider = "football_data_org"
            
        await set_cache(cache_key, parsed_data, ttl_seconds=86400) # 24 hours
        return IntegrationResponse(success=True, provider=provider, cached=False, data=parsed_data)
