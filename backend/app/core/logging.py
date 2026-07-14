import contextvars
import logging
import logging.config
import json
from datetime import datetime, timezone
from typing import Any, Dict

# Context variables to hold Request ID and Client IP within the async execution context
request_id_var: contextvars.ContextVar[str] = contextvars.ContextVar("request_id", default="-")
client_ip_var: contextvars.ContextVar[str] = contextvars.ContextVar("client_ip", default="-")

class JSONStructuredFormatter(logging.Formatter):
    """
    Enterprise JSON formatter that outputs all logs as structured JSON payloads.
    Suitable for ingestion by Datadog, ELK, Splunk, etc.
    """
    def format(self, record: logging.LogRecord) -> str:
        log_obj: Dict[str, Any] = {
            "timestamp": datetime.fromtimestamp(record.created, tz=timezone.utc).isoformat(),
            "level": record.levelname,
            "logger": record.name,
            "message": record.getMessage(),
            "request_id": request_id_var.get(),
            "client_ip": client_ip_var.get(),
        }
        
        # Add exception info if present
        if record.exc_info:
            log_obj["exception"] = self.formatException(record.exc_info)
            
        return json.dumps(log_obj)

def setup_logging(level: str = "INFO") -> None:
    """
    Configures standard Python logging module with JSON structured logging handlers.
    """
    log_config = {
        "version": 1,
        "disable_existing_loggers": False,
        "formatters": {
            "json_structured": {
                "class": "backend.app.core.logging.JSONStructuredFormatter",
            }
        },
        "handlers": {
            "console": {
                "class": "logging.StreamHandler",
                "formatter": "json_structured",
                "level": level,
            }
        },
        "root": {
            "handlers": ["console"],
            "level": level,
        },
        "loggers": {
            "uvicorn": {
                "handlers": ["console"],
                "level": "INFO",
                "propagate": False
            },
            "uvicorn.error": {
                "level": "INFO",
                "propagate": True
            },
            "uvicorn.access": {
                "handlers": ["console"],
                "level": "INFO",
                "propagate": False
            }
        }
    }
    logging.config.dictConfig(log_config)

# Global base logger instance for core configuration
logger = logging.getLogger("stadium_os")
