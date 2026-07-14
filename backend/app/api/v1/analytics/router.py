from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Dict, Any
from backend.app.database.session import get_db_session as get_db

router = APIRouter()

@router.get("/usage-history")
async def get_usage_history(db: AsyncSession = Depends(get_db)):
    """Retrieve historical stadium throughput and energy usage history."""
    return [
        {"timestamp": "2026-06-08", "attendance": 78200, "energy_mw": 14.5, "concession_sales_usd": 420000},
        {"timestamp": "2026-06-09", "attendance": 81400, "energy_mw": 15.1, "concession_sales_usd": 485000},
        {"timestamp": "2026-06-10", "attendance": 82500, "energy_mw": 15.8, "concession_sales_usd": 510000},
        {"timestamp": "2026-06-11", "attendance": 82500, "energy_mw": 16.2, "concession_sales_usd": 540000}
    ]

@router.get("/insights")
async def get_analytics_insights(db: AsyncSession = Depends(get_db)):
    """Retrieve AI executive analytics insights."""
    return [
        {"category": "Crowd Flow", "insight": "North Gate A experienced 14% faster egress due to dynamic signage routing.", "impact": "High"},
        {"category": "Energy Optimization", "insight": "Solar roof battery discharge reduced peak grid reliance by 33% during halftime.", "impact": "High"},
        {"category": "Commercial Sales", "insight": "Mobile app express food pickup increased per-fan spend by $6.80.", "impact": "Medium"}
    ]
