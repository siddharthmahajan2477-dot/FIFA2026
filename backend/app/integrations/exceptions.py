class IntegrationError(Exception):
    """Base exception for all integration errors."""
    pass

class ProviderRateLimitError(IntegrationError):
    """Raised when a provider rate limit is hit (429)."""
    pass

class ProviderTimeoutError(IntegrationError):
    """Raised when a provider connection times out."""
    pass

class ProviderAuthenticationError(IntegrationError):
    """Raised when API keys are invalid (401/403)."""
    pass

class ProviderUnavailableError(IntegrationError):
    """Raised when a provider is down (500/503)."""
    pass
