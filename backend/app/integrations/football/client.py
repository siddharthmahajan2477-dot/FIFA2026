import httpx
from typing import Any, Dict
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type

from backend.app.core.config import settings
from backend.app.integrations.exceptions import (
    ProviderTimeoutError,
    ProviderRateLimitError,
    ProviderAuthenticationError,
    ProviderUnavailableError,
    IntegrationError
)

class BaseAPIClient:
    def __init__(self, base_url: str, headers: Dict[str, str]):
        self.base_url = base_url
        self.headers = headers

    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=2, max=10),
        retry=retry_if_exception_type((ProviderTimeoutError, ProviderUnavailableError))
    )
    async def get(self, endpoint: str, params: Dict[str, Any] = None) -> Dict[str, Any]:
        url = f"{self.base_url}{endpoint}"
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                response = await client.get(url, headers=self.headers, params=params)
                
                if response.status_code == 401 or response.status_code == 403:
                    raise ProviderAuthenticationError(f"Authentication failed: {response.status_code}")
                elif response.status_code == 429:
                    raise ProviderRateLimitError(f"Rate limit exceeded: {response.status_code}")
                elif response.status_code >= 500:
                    raise ProviderUnavailableError(f"Provider unavailable: {response.status_code}")
                
                response.raise_for_status()
                return response.json()
                
        except httpx.TimeoutException:
            raise ProviderTimeoutError(f"Request timed out for {url}")
        except httpx.HTTPStatusError as e:
            raise IntegrationError(f"HTTP error: {e}")
        except httpx.RequestError as e:
            raise IntegrationError(f"Request error: {e}")

class APIFootballClient(BaseAPIClient):
    def __init__(self):
        super().__init__(
            base_url=settings.FOOTBALL_API_BASE_URL,
            headers={
                "x-apisports-key": settings.FOOTBALL_API_KEY,
            }
        )

class FootballDataOrgClient(BaseAPIClient):
    def __init__(self):
        super().__init__(
            base_url="https://api.football-data.org/v4",
            headers={
                "X-Auth-Token": settings.FOOTBALL_DATA_ORG_API_KEY,
            }
        )
