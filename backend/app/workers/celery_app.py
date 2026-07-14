from celery import Celery
from backend.app.core.config import settings

# Initialize Celery app with Redis broker and results backend
celery_app = Celery(
    "stadium_os_workers",
    broker=settings.CELERY_BROKER_URL,
    backend=settings.CELERY_RESULT_BACKEND,
)

# Standard enterprise configuration tuning
celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    task_track_started=True,
    task_time_limit=3600,         # Absolute time limit for tasks (1 hour)
    task_soft_time_limit=3000,    # Soft time limit for tasks (50 mins)
    task_acks_late=True,          # Acknowledge task after execution completes (safe failover)
    task_reject_on_worker_lost=True,
    broker_connection_retry_on_startup=True,
    # Auto-load tasks registry module
    imports=["backend.app.tasks.tasks"],
)
