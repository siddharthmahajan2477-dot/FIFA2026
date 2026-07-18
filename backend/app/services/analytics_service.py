from sqlalchemy.ext.asyncio import AsyncSession

async def get_usage_history(db: AsyncSession):
    return {
        "throughput": [
            {"time": "12:00", "value": 500},
            {"time": "13:00", "value": 1500},
            {"time": "14:00", "value": 12000},
            {"time": "15:00", "value": 35000},
        ],
        "energy": [
            {"time": "12:00", "value": 200},
            {"time": "13:00", "value": 350},
            {"time": "14:00", "value": 800},
            {"time": "15:00", "value": 950},
        ],
    }

async def get_analytics_insights(db: AsyncSession):
    return [
        {"id": "ins1", "title": "High Congestion at Gate C", "description": "Flow rate exceeds capacity by 15%. Redirecting VIPs to Gate B.", "severity": "high"},
        {"id": "ins2", "title": "Energy Spike in North Wing", "description": "HVAC usage surged. Consider adjusting thermostat setpoints.", "severity": "medium"},
        {"id": "ins3", "title": "Merch Sales Peaking", "description": "Home team jersey sales up 300% in last hour.", "severity": "low"},
    ]
