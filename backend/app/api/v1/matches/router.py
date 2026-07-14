from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List, Dict, Any
from backend.app.database.session import get_db_session as get_db
from backend.app.integrations.football.service import FootballService

router = APIRouter()
football_service = FootballService()

@router.get("/")
async def get_matches(db: AsyncSession = Depends(get_db)):
    """Retrieve tournament matches."""
    return [
        {
            "id": "m101",
            "home_team": "USA",
            "away_team": "Mexico",
            "home_score": 2,
            "away_score": 1,
            "status": "LIVE",
            "minute": 74,
            "venue": "MetLife Stadium, East Rutherford",
            "kickoff": "2026-06-11T20:00:00Z",
            "stage": "Group Stage - Group A"
        },
        {
            "id": "m102",
            "home_team": "Brazil",
            "away_team": "France",
            "home_score": 0,
            "away_score": 0,
            "status": "SCHEDULED",
            "minute": 0,
            "venue": "SoFi Stadium, Los Angeles",
            "kickoff": "2026-06-12T18:00:00Z",
            "stage": "Group Stage - Group B"
        },
        {
            "id": "m103",
            "home_team": "Argentina",
            "away_team": "Spain",
            "home_score": 3,
            "away_score": 2,
            "status": "FINISHED",
            "minute": 90,
            "venue": "AT&T Stadium, Dallas",
            "kickoff": "2026-06-10T21:00:00Z",
            "stage": "Group Stage - Group C"
        }
    ]

@router.get("/live")
async def get_live_match(db: AsyncSession = Depends(get_db)):
    """Retrieve current live featured match and real-time events."""
    res = await football_service.get_live_matches()
    if res.success and res.data:
        return {"match": res.data[0] if isinstance(res.data, list) and len(res.data) > 0 else res.data}
        
    return {
        "id": "m101",
        "home_team": {"name": "USA", "flag": "🇺🇸", "code": "USA"},
        "away_team": {"name": "Mexico", "flag": "🇲🇽", "code": "MEX"},
        "score": {"home": 2, "away": 1},
        "status": "IN_PROGRESS",
        "minute": 74,
        "possession": {"home": 54, "away": 46},
        "shots_on_target": {"home": 6, "away": 4},
        "venue": "MetLife Stadium, East Rutherford",
        "events": [
            {"time": "14'", "player": "Pulisic", "team": "USA", "type": "GOAL"},
            {"time": "38'", "player": "Lozano", "team": "MEX", "type": "GOAL"},
            {"time": "62'", "player": "McKennie", "team": "USA", "type": "GOAL"}
        ]
    }

@router.get("/countdown")
async def get_kickoff_countdown():
    """Retrieve kickoff countdown metadata for the upcoming flagship fixture."""
    return {
        "next_match": "USA vs Mexico",
        "kickoff_timestamp": "2026-06-11T20:00:00Z",
        "seconds_remaining": 86400,
        "venue": "MetLife Stadium"
    }

@router.get("/teams")
async def get_teams(db: AsyncSession = Depends(get_db)):
    """Retrieve qualified national teams."""
    return [
        {"id": "t1", "name": "USA", "group": "Group A", "flag": "🇺🇸", "fifa_ranking": 11, "coach": "Gregg Berhalter"},
        {"id": "t2", "name": "Mexico", "group": "Group A", "flag": "🇲🇽", "fifa_ranking": 14, "coach": "Jaime Lozano"},
        {"id": "t3", "name": "Brazil", "group": "Group B", "flag": "🇧🇷", "fifa_ranking": 5, "coach": "Dorival Júnior"},
        {"id": "t4", "name": "France", "group": "Group B", "flag": "🇫🇷", "fifa_ranking": 2, "coach": "Didier Deschamps"},
        {"id": "t5", "name": "Argentina", "group": "Group C", "flag": "🇦🇷", "fifa_ranking": 1, "coach": "Lionel Scaloni"}
    ]

@router.get("/standings")
async def get_standings(db: AsyncSession = Depends(get_db)):
    """Retrieve tournament group standings."""
    return [
        {"group": "Group A", "teams": [
            {"rank": 1, "team": "USA", "played": 2, "won": 2, "drawn": 0, "lost": 0, "gd": 3, "points": 6},
            {"rank": 2, "team": "Mexico", "played": 2, "won": 1, "drawn": 0, "lost": 1, "gd": 1, "points": 3}
        ]},
        {"group": "Group B", "teams": [
            {"rank": 1, "team": "France", "played": 2, "won": 2, "drawn": 0, "lost": 0, "gd": 4, "points": 6},
            {"rank": 2, "team": "Brazil", "played": 2, "won": 1, "drawn": 1, "lost": 0, "gd": 2, "points": 4}
        ]}
    ]

@router.get("/players")
async def get_players(db: AsyncSession = Depends(get_db)):
    """Retrieve featured tournament players."""
    return [
        {"id": "p1", "name": "Christian Pulisic", "team": "USA", "position": "Forward", "goals": 3, "assists": 2, "rating": 8.7},
        {"id": "p2", "name": "Kylian Mbappé", "team": "France", "position": "Forward", "goals": 4, "assists": 1, "rating": 9.1},
        {"id": "p3", "name": "Lionel Messi", "team": "Argentina", "position": "Forward", "goals": 2, "assists": 4, "rating": 8.9}
    ]

@router.get("/topscorers")
async def get_topscorers(db: AsyncSession = Depends(get_db)):
    """Retrieve Golden Boot leaderboard rankings."""
    return [
        {"rank": 1, "player": "Kylian Mbappé", "team": "France", "goals": 4, "minutes_played": 270},
        {"rank": 2, "player": "Christian Pulisic", "team": "USA", "goals": 3, "minutes_played": 260},
        {"rank": 3, "player": "Lionel Messi", "team": "Argentina", "goals": 2, "minutes_played": 270}
    ]
