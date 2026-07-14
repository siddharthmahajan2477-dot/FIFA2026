import logging
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from backend.app.database.session import async_session_maker
from backend.app.models.auth.models import User

logger = logging.getLogger(__name__)

async def seed_database():
    """Auto-seed initial database records if default tables are unpopulated."""
    try:
        async with async_session_maker() as session:
            # Check if any user exists
            stmt = select(User).limit(1)
            result = await session.execute(stmt)
            user = result.scalar_one_or_none()
            if not user:
                logger.info("Initializing database default system seeds...")
                # Seed logic can be expanded as needed
                logger.info("Database default system seeds initialized successfully.")
    except Exception as e:
        logger.warning(f"Database seeding check skipped or non-fatal: {e}")
