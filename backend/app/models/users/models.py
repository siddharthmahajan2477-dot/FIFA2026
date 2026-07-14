from sqlalchemy import Column, String, Integer, ForeignKey, Boolean, JSON
from sqlalchemy.orm import relationship
from backend.app.models.base import BaseModel

class Country(BaseModel):
    __tablename__ = "countries"
    
    code = Column(String(2), unique=True, index=True, nullable=False) # ISO 3166-1 alpha-2
    name = Column(String(100), unique=True, nullable=False)
    phone_code = Column(String(10), nullable=True)

class Language(BaseModel):
    __tablename__ = "languages"
    
    code = Column(String(5), unique=True, index=True, nullable=False) # ISO 639-1 e.g. en, es, fr
    name = Column(String(100), unique=True, nullable=False)
    native_name = Column(String(100), nullable=True)

class UserProfile(BaseModel):
    __tablename__ = "user_profiles"
    
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    first_name = Column(String(100), nullable=True)
    last_name = Column(String(100), nullable=True)
    phone_number = Column(String(20), nullable=True)
    avatar_url = Column(String(255), nullable=True)
    date_of_birth = Column(String(10), nullable=True) # YYYY-MM-DD
    gender = Column(String(20), nullable=True)
    
    # Relationships
    user = relationship("User", back_populates="profile")
    addresses = relationship("Address", back_populates="profile", cascade="all, delete-orphan")
    favorite_teams = relationship("FavoriteTeam", back_populates="profile", cascade="all, delete-orphan")
    notification_preferences = relationship("NotificationPreference", uselist=False, back_populates="profile", cascade="all, delete-orphan")
    privacy_settings = relationship("PrivacySetting", uselist=False, back_populates="profile", cascade="all, delete-orphan")

class Address(BaseModel):
    __tablename__ = "addresses"
    
    profile_id = Column(Integer, ForeignKey("user_profiles.id", ondelete="CASCADE"), nullable=False, index=True)
    street_line_1 = Column(String(255), nullable=False)
    street_line_2 = Column(String(255), nullable=True)
    city = Column(String(100), nullable=False)
    state_province = Column(String(100), nullable=True)
    postal_code = Column(String(20), nullable=True)
    country_id = Column(Integer, ForeignKey("countries.id", ondelete="SET NULL"), nullable=True)
    is_primary = Column(Boolean, default=False)
    
    # Relationships
    profile = relationship("UserProfile", back_populates="addresses")
    country = relationship("Country")

class FavoriteTeam(BaseModel):
    __tablename__ = "favorite_teams"
    
    profile_id = Column(Integer, ForeignKey("user_profiles.id", ondelete="CASCADE"), nullable=False, index=True)
    team_id = Column(Integer, ForeignKey("teams.id", ondelete="CASCADE"), nullable=False, index=True)
    
    # Relationships
    profile = relationship("UserProfile", back_populates="favorite_teams")
    # team relationship will be defined on the Team model or explicitly back_populated here

class NotificationPreference(BaseModel):
    __tablename__ = "notification_preferences"
    
    profile_id = Column(Integer, ForeignKey("user_profiles.id", ondelete="CASCADE"), unique=True, nullable=False)
    email_updates = Column(Boolean, default=True)
    sms_updates = Column(Boolean, default=False)
    push_notifications = Column(Boolean, default=True)
    match_reminders = Column(Boolean, default=True)
    marketing_emails = Column(Boolean, default=False)
    
    # Relationships
    profile = relationship("UserProfile", back_populates="notification_preferences")

class PrivacySetting(BaseModel):
    __tablename__ = "privacy_settings"
    
    profile_id = Column(Integer, ForeignKey("user_profiles.id", ondelete="CASCADE"), unique=True, nullable=False)
    profile_visibility = Column(String(20), default="public") # public, private, friends
    show_location = Column(Boolean, default=False)
    allow_messages = Column(Boolean, default=True)
    data_sharing_consent = Column(Boolean, default=False)
    
    # Relationships
    profile = relationship("UserProfile", back_populates="privacy_settings")
