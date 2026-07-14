import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, DateTime, Boolean, ForeignKey, Numeric
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from backend.app.core.database import Base

class AuditMixin:
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    created_by = Column(String, nullable=True)
    updated_by = Column(String, nullable=True)
    status = Column(String, default="active", nullable=False)
    is_deleted = Column(Boolean, default=False, nullable=False)

class Role(Base, AuditMixin):
    __tablename__ = "roles"
    name = Column(String, unique=True, index=True, nullable=False)
    description = Column(String, nullable=True)

class User(Base, AuditMixin):
    __tablename__ = "users"
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=True)
    role_id = Column(UUID(as_uuid=True), ForeignKey("roles.id"), nullable=True)
    role = Column(String, default="Fan", nullable=False)
    firebase_uid = Column(String, unique=True, index=True, nullable=True)
    username = Column(String, unique=True, index=True, nullable=True)
    display_name = Column(String, nullable=True)
    avatar = Column(String, nullable=True)
    favorite_team = Column(String, nullable=True)
    favorite_club = Column(String, nullable=True)
    country = Column(String, nullable=True)
    language = Column(String, default="en", nullable=False)
    theme_pref = Column(String, default="dark", nullable=False)
    last_login = Column(DateTime, default=datetime.utcnow, nullable=True)

class Team(Base, AuditMixin):
    __tablename__ = "teams"
    name = Column(String, unique=True, index=True, nullable=False)
    flag = Column(String, nullable=True)
    points = Column(Integer, default=0)

class Player(Base, AuditMixin):
    __tablename__ = "players"
    name = Column(String, index=True, nullable=False)
    number = Column(Integer, nullable=False)
    position = Column(String, nullable=False)
    team_id = Column(UUID(as_uuid=True), ForeignKey("teams.id"), nullable=True)

class Match(Base, AuditMixin):
    __tablename__ = "matches"
    __tablename__ = "matches"
    home_team_id = Column(UUID(as_uuid=True), ForeignKey("teams.id"), nullable=False)
    away_team_id = Column(UUID(as_uuid=True), ForeignKey("teams.id"), nullable=False)
    home_score = Column(Integer, default=0)
    away_score = Column(Integer, default=0)
    match_status = Column(String, default="scheduled") # live, scheduled, completed

class Ticket(Base, AuditMixin):
    __tablename__ = "tickets"
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)
    match_id = Column(UUID(as_uuid=True), ForeignKey("matches.id"), nullable=False)
    section = Column(String, nullable=False)
    row = Column(String, nullable=False)
    seat = Column(String, nullable=False)
    price = Column(Numeric(10, 2), nullable=False)

class Restroom(Base, AuditMixin):
    __tablename__ = "restrooms"
    name = Column(String, index=True, nullable=False)
    gender = Column(String, nullable=False)
    occupancy = Column(Integer, default=0)
    capacity = Column(Integer, default=50)

class Incident(Base, AuditMixin):
    __tablename__ = "incidents"
    title = Column(String, index=True, nullable=False)
    details = Column(String, nullable=True)
    category = Column(String, nullable=False) # medical, security
    severity = Column(String, default="low") # low, medium, high
