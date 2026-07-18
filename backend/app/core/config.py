import os
from typing import List, Optional, Any
from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    # Core Application Settings
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "FIFA World Cup 2026 Smart Stadium OS"
    APP_ENV: str = "development"  # development, testing, production
    DEBUG: bool = True
    
    # Server Configuration
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    
    # Database (PostgreSQL) URL - fallback to development local pg server
    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/stadium"
    POSTGRES_DB_URL: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/stadium"
    
    # Cache (Redis) Configuration
    REDIS_URL: str = "redis://localhost:6379/0"
    
    # Background Worker (Celery) Configuration
    CELERY_BROKER_URL: str = "redis://localhost:6379/1"
    CELERY_RESULT_BACKEND: str = "redis://localhost:6379/2"
    
    # Security Configuration
    JWT_SECRET: str = "change-me-in-production"
    REFRESH_SECRET: str = "change-me-in-production-refresh"
    WEBHOOK_SECRET: str = "change-me-webhook"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 10080  # 7 days
    
    # Middlewares Configurations
    CORS_ORIGINS: Any = ["http://localhost:3000", "http://127.0.0.1:3000"]
    ALLOWED_HOSTS: Any = ["localhost", "127.0.0.1", "testserver"]
    
    # External APIs (Placeholders)
    GOOGLE_GENAI_API_KEY: Optional[str] = None
    GOOGLE_GENAI_MODEL: str = "gemini-2.0-flash-exp"
    AI_PROVIDER: str = "Google Gemini"
    WEATHER_API_KEY: Optional[str] = None
    FOOTBALL_API_KEY: Optional[str] = None
    FOOTBALL_DATA_ORG_API_KEY: Optional[str] = None
    FOOTBALL_API_BASE_URL: str = "https://v3.football.api-sports.io"
    OPENWEATHER_BASE_URL: str = "https://api.openweathermap.org/data/2.5"
    GOOGLE_ANALYTICS_ID: Optional[str] = None
    GA_API_SECRET: Optional[str] = None
    
    # Firebase Service Configuration
    FIREBASE_PROJECT_ID: Optional[str] = None
    FIREBASE_CLIENT_EMAIL: Optional[str] = None
    FIREBASE_PRIVATE_KEY: Optional[str] = None

    @field_validator("ALLOWED_HOSTS", mode="before")
    @classmethod
    def parse_allowed_hosts(cls, v: Any) -> List[str]:
        if isinstance(v, str):
            hosts = [x.strip() for x in v.split(",") if x.strip()]
        elif isinstance(v, list):
            hosts = v
        else:
            hosts = []
        if "testserver" not in hosts:
            hosts.append("testserver")
        return hosts

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def parse_cors_origins(cls, v: Any) -> List[str]:
        allowed_origins = os.getenv("ALLOWED_ORIGINS")
        if allowed_origins:
            return [x.strip() for x in allowed_origins.split(",") if x.strip()]
        if isinstance(v, str):
            return [x.strip() for x in v.split(",") if x.strip()]
        return v

    @field_validator("DATABASE_URL", "POSTGRES_DB_URL", mode="before")
    @classmethod
    def clean_db_url(cls, v: Any) -> str:
        if isinstance(v, str) and "?" in v:
            base_url, query = v.split("?", 1)
            from urllib.parse import parse_qsl, urlencode
            params = dict(parse_qsl(query))
            params.pop("sslmode", None)
            params.pop("channel_binding", None)
            if params:
                return f"{base_url}?{urlencode(params)}"
            return base_url
        return v

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore"
    )

settings = Settings()
