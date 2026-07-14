from pydantic import BaseModel, EmailStr
from uuid import UUID
from datetime import datetime
from typing import Optional, List

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: UUID
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

class MatchBase(BaseModel):
    home_team_id: UUID
    away_team_id: UUID
    match_status: str

class MatchResponse(MatchBase):
    id: UUID
    home_score: int
    away_score: int

    class Config:
        from_attributes = True

class TicketBase(BaseModel):
    match_id: UUID
    section: str
    row: str
    seat: str

class TicketResponse(TicketBase):
    id: UUID
    price: float

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class UserSyncRequest(BaseModel):
    username: Optional[str] = None
    display_name: str
    country: str
    favorite_team: str
    favorite_club: str
    language: str
    role: str

class UserSyncResponse(BaseModel):
    firebase_uid: str
    email: EmailStr
    username: Optional[str]
    display_name: Optional[str]
    country: Optional[str]
    favorite_team: Optional[str]
    favorite_club: Optional[str]
    language: str
    role: str

    class Config:
        from_attributes = True
