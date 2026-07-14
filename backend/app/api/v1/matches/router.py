from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.database.session import get_db_session as get_db
from backend.app.schemas.schemas import MatchResponse
from typing import List

router = APIRouter()

@router.get("/", response_model=List[MatchResponse])
async def get_matches(db: AsyncSession = Depends(get_db)):
    """
    Retrieves a list of tournament matches.
    """
    return []
