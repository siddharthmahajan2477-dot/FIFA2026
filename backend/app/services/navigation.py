from abc import ABC, abstractmethod
from typing import List, Dict, Any

class MapProvider(ABC):
    @abstractmethod
    async def get_route(self, origin: str, destination: str) -> Dict[str, Any]:
        pass

class MapboxProvider(MapProvider):
    async def get_route(self, origin: str, destination: str) -> Dict[str, Any]:
        return {"route": "Optimized route through East Concourse"}

class NavigationService:
    def __init__(self, provider: MapProvider):
        self.provider = provider

    async def get_facility_navigation(self, target: str) -> Dict[str, Any]:
        return await self.provider.get_route("current_gate", target)
