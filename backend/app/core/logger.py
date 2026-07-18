import logging
from .logging import logger as base_logger


def log(event: str, level: str = "INFO", **kwargs) -> None:
    """Convenient helper to emit a structured log entry.

    Args:
        event: Human‑readable description of the event.
        level: Logging level name ("DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL").
        **kwargs: Additional key‑value pairs that will be merged into the JSON payload.
    """
    # Attach request context if available via the structured logger's context vars.
    extra = kwargs.copy()
    extra["event"] = event
    # Use the base logger configured by `setup_logging`.
    log_func = getattr(base_logger, level.lower(), base_logger.info)
    log_func(event, extra=extra)
