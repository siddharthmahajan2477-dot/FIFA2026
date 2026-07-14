from sqlalchemy import Column, String, Integer, ForeignKey, Boolean, JSON, DateTime, Text, Numeric
from sqlalchemy.orm import relationship
from backend.app.models.base import BaseModel

class AnalyticsEvent(BaseModel):
    __tablename__ = "analytics_events"
    
    user_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True)
    session_id = Column(String(255), nullable=True, index=True)
    event_name = Column(String(100), nullable=False, index=True) # e.g. ticket_purchased, food_ordered, gate_entry
    event_category = Column(String(50), nullable=False)
    event_data = Column(JSON, nullable=True)
    platform = Column(String(50), nullable=True) # web, ios, android

class UserActivity(BaseModel):
    __tablename__ = "user_activities"
    
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    activity_type = Column(String(50), nullable=False) # login, profile_update, settings_change
    ip_address = Column(String(45), nullable=True)
    user_agent = Column(Text, nullable=True)

class SearchHistory(BaseModel):
    __tablename__ = "search_history"
    
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=True, index=True)
    search_query = Column(String(255), nullable=False)
    search_category = Column(String(50), nullable=True) # e.g. player, team, food
    results_count = Column(Integer, default=0)

class PageView(BaseModel):
    __tablename__ = "page_views"
    
    user_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True)
    session_id = Column(String(255), nullable=True)
    page_url = Column(String(255), nullable=False, index=True)
    time_spent_seconds = Column(Integer, default=0)

class Heatmap(BaseModel):
    __tablename__ = "heatmaps"
    
    stadium_id = Column(Integer, ForeignKey("stadiums.id", ondelete="CASCADE"), nullable=False, index=True)
    zone_id = Column(Integer, ForeignKey("crowd_zones.id", ondelete="CASCADE"), nullable=False)
    generated_at = Column(DateTime(timezone=True), nullable=False)
    density_matrix = Column(JSON, nullable=False) # 2D array or structured data

class Report(BaseModel):
    __tablename__ = "analytics_reports"
    
    title = Column(String(255), nullable=False)
    report_type = Column(String(50), nullable=False) # daily, matchday, financial, operational
    generated_by_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    report_data = Column(JSON, nullable=True)
    file_url = Column(String(255), nullable=True)
