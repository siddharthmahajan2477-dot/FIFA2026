import uuid
from datetime import datetime, timezone
from enum import Enum
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Enum as SQLEnum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class StatusEnum(str, Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"
    PENDING = "pending"
    DELETED = "deleted"
    ARCHIVED = "archived"

class BaseModel(Base):
    """
    Abstract Base Model with standard enterprise audit fields.
    """
    __abstract__ = True

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    uuid = Column(UUID(as_uuid=True), default=uuid.uuid4, unique=True, index=True, nullable=False)
    
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)
    deleted_at = Column(DateTime(timezone=True), nullable=True)
    
    created_by = Column(UUID(as_uuid=True), nullable=True) # UUID of the user who created it
    updated_by = Column(UUID(as_uuid=True), nullable=True) # UUID of the user who last updated it
    
    status = Column(SQLEnum(StatusEnum, name="status_enum"), default=StatusEnum.ACTIVE, nullable=False)
