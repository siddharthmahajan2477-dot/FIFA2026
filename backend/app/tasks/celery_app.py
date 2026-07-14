from celery import Celery
from backend.app.core.config import settings

celery_app = Celery(
    "stadium_os_worker",
    broker=settings.CELERY_BROKER_URL,
    backend=settings.CELERY_RESULT_BACKEND,
    include=["backend.app.tasks.integration_tasks", "backend.app.tasks.realtime_tasks"]
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
)

# Scheduled Background Tasks for Cache Warming and Realtime Simulation
celery_app.conf.beat_schedule = {
    "warm-football-standings-every-15-mins": {
        "task": "backend.app.tasks.integration_tasks.warm_football_standings",
        "schedule": 900.0, # 15 minutes
        "args": (1, 2026), # Example: World Cup league ID and season
    },
    "warm-stadium-weather-every-5-mins": {
        "task": "backend.app.tasks.integration_tasks.warm_stadium_weather",
        "schedule": 300.0, # 5 minutes
        "args": (40.8296, -74.0817), # Example: MetLife Stadium coordinates
    },
    "simulate-match-events-every-10-secs": {
        "task": "backend.app.tasks.realtime_tasks.simulate_match_events",
        "schedule": 10.0,
    },
    "simulate-infrastructure-every-15-secs": {
        "task": "backend.app.tasks.realtime_tasks.simulate_infrastructure",
        "schedule": 15.0,
    },
    "simulate-security-medical-every-20-secs": {
        "task": "backend.app.tasks.realtime_tasks.simulate_security_medical",
        "schedule": 20.0,
    },
}
