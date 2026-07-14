from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Dict, Any
from backend.app.database.session import get_db_session as get_db

router = APIRouter()

@router.get("/parking-zones")
async def get_parking_zones(db: AsyncSession = Depends(get_db)):
    """Retrieve smart parking occupancy and EV charging availability."""
    return [
        {"zone_id": "P-NORTH-1", "name": "North Lot A (VIP & Media)", "total_spots": 1200, "occupied_spots": 940, "ev_chargers_available": 34, "fee_rate_usd": 40},
        {"zone_id": "P-SOUTH-2", "name": "South Lot B (Public)", "total_spots": 3500, "occupied_spots": 2100, "ev_chargers_available": 12, "fee_rate_usd": 25},
        {"zone_id": "P-WEST-3", "name": "West Garage (Reserved)", "total_spots": 1800, "occupied_spots": 1650, "ev_chargers_available": 45, "fee_rate_usd": 35}
    ]

@router.get("/energy-usage")
async def get_energy_usage(db: AsyncSession = Depends(get_db)):
    """Retrieve real-time power grid, solar, and LED lighting energy telemetry."""
    return {
        "current_load_mw": 14.2,
        "grid_supply_mw": 9.5,
        "solar_roof_generation_mw": 4.7,
        "renewable_percentage": 33.1,
        "carbon_offset_tons_today": 18.4,
        "hourly_trend": [
            {"hour": "12:00", "load_mw": 8.1},
            {"hour": "14:00", "load_mw": 10.4},
            {"hour": "16:00", "load_mw": 12.8},
            {"hour": "18:00", "load_mw": 14.2}
        ]
    }

@router.get("/water-usage")
async def get_water_usage(db: AsyncSession = Depends(get_db)):
    """Retrieve water consumption, greywater recycling, and pitch irrigation metrics."""
    return {
        "daily_consumption_gallons": 45000,
        "recycled_greywater_gallons": 18500,
        "pitch_irrigation_gallons": 12000,
        "recycled_percentage": 41.1,
        "conservation_status": "Optimal Efficiency"
    }

@router.get("/sewage-usage")
async def get_sewage_usage(db: AsyncSession = Depends(get_db)):
    """Retrieve sewage treatment and flow capacity metrics."""
    return {
        "capacity_percentage": 38.4,
        "current_flow_rate_gpm": 420,
        "peak_capacity_gpm": 1200,
        "treatment_plant_status": "Operational"
    }
