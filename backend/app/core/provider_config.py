"""
Central Provider Configuration Registry
FIFA World Cup 2026 Smart Stadium Operating System

All provider selections are driven by environment variables.
No providers or API keys are ever hardcoded.
"""

from __future__ import annotations

import os
from dataclasses import dataclass


@dataclass(frozen=True)
class ProviderConfig:
    """Immutable snapshot of active provider selections for this process."""

    # AI
    ai: str = "google_genai"

    # Football data
    football: str = "api_football"

    # Weather
    weather: str = "open_weather"

    # Maps / Navigation
    maps: str = "google_maps"

    # Payments
    payment: str = "stripe"

    # Email
    email: str = "sendgrid"

    # SMS
    sms: str = "twilio"

    # Push notifications
    push: str = "firebase"

    # Object / media storage
    storage: str = "s3"


def load_provider_config() -> ProviderConfig:
    """
    Read provider selections from environment variables.
    Falls back to documented defaults if a variable is absent.
    """
    return ProviderConfig(
        ai=os.getenv("AI_PROVIDER", "google_genai"),
        football=os.getenv("FOOTBALL_PROVIDER", "api_football"),
        weather=os.getenv("WEATHER_PROVIDER", "open_weather"),
        maps=os.getenv("MAPS_PROVIDER", "google_maps"),
        payment=os.getenv("PAYMENT_PROVIDER", "stripe"),
        email=os.getenv("EMAIL_PROVIDER", "sendgrid"),
        sms=os.getenv("SMS_PROVIDER", "twilio"),
        push=os.getenv("PUSH_PROVIDER", "firebase"),
        storage=os.getenv("STORAGE_PROVIDER", "s3"),
    )


# Module-level singleton — imported by services/routers.
provider_config: ProviderConfig = load_provider_config()
