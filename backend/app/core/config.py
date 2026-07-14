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
    DATABASE_URL: str = "postgresql+asyncpg://neondb_owner:npg_3trCS9nGFJio@ep-long-unit-azyes96p-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
    POSTGRES_DB_URL: str = "postgresql+asyncpg://neondb_owner:npg_3trCS9nGFJio@ep-long-unit-azyes96p-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
    
    # Cache (Redis) Configuration
    REDIS_URL: str = "rediss://default:gQAAAAAAAnQgAAIgcDIzODI4ZTBhNGRhMmU0YTBkODExNWZiNWFkZjE3YWZlYQ@rich-cub-160800.upstash.io:6379"
    
    # Background Worker (Celery) Configuration
    CELERY_BROKER_URL: str = "rediss://default:gQAAAAAAAnQgAAIgcDIzODI4ZTBhNGRhMmU0YTBkODExNWZiNWFkZjE3YWZlYQ@rich-cub-160800.upstash.io:6379"
    CELERY_RESULT_BACKEND: str = "rediss://default:gQAAAAAAAnQgAAIgcDIzODI4ZTBhNGRhMmU0YTBkODExNWZiNWFkZjE3YWZlYQ@rich-cub-160800.upstash.io:6379"
    
    # Security Configuration
    JWT_SECRET: str = "change-me-in-production"
    REFRESH_SECRET: str = "change-me-in-production-refresh"
    WEBHOOK_SECRET: str = "change-me-webhook"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 10080  # 7 days
    
    # Middlewares Configurations
    CORS_ORIGINS: Any = ["*"]
    ALLOWED_HOSTS: Any = ["localhost", "127.0.0.1"]
    
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

    @field_validator("ALLOWED_HOSTS", "CORS_ORIGINS", mode="before")
    @classmethod
    def parse_comma_separated_list(cls, v: Any) -> List[str]:
        if isinstance(v, str):
            return [x.strip() for x in v.split(",") if x.strip()]
        return v

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore"
    )

settings = Settings()
