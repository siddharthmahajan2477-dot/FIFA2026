from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.database.session import get_db_session as get_db
from backend.app.services.analytics_service import get_usage_history as analytics_get_usage_history, get_analytics_insights as analytics_get_insights

router = APIRouter()

@router.get("/usage-history")
async def get_usage_history(db: AsyncSession = Depends(get_db)):
    """Retrieve historical stadium throughput and energy usage history via service layer."""
    return await analytics_get_usage_history(db)

@router.get("/insights")
async def get_analytics_insights(db: AsyncSession = Depends(get_db)):
    """Retrieve AI executive analytics insights via service layer."""
    return await analytics_get_insights(db)
