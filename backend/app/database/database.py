from sqlalchemy.ext.asyncio import create_async_engine
from backend.app.core.config import settings
from backend.app.core.logging import logger

# Async PostgreSQL engine with enterprise connection pooling and execution parameters
engine = create_async_engine(
    settings.DATABASE_URL,
    echo=settings.DEBUG,
    pool_size=50,
    max_overflow=20,
    pool_timeout=15.0, # Fail fast on connections
    pool_recycle=1800, # Recycle connections every 30 minutes
    pool_pre_ping=True, # Validate connections before use
    future=True,
    connect_args={
        "command_timeout": 30, # Terminate slow queries after 30s
        "server_settings": {"jit": "off"}, # Disable JIT for general OLTP workloads
        "ssl": True # Explicitly enable SSL for cloud databases (Neon)
    }
)

async def check_db_health() -> bool:
    """
    Checks if the database is reachable by executing a simple SELECT 1 statement.
    """
    from sqlalchemy.sql import text
    try:
        async with engine.connect() as conn:
            await conn.execute(text("SELECT 1"))
        return True
    except Exception as e:
        logger.error(f"Database connection health check failed: {str(e)}")
        return False
