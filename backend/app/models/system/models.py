from sqlalchemy import Column, String, Integer, ForeignKey, Boolean, Text, JSON, DateTime
from sqlalchemy.orm import relationship
from backend.app.models.base import BaseModel

class AuditLog(BaseModel):
    __tablename__ = "audit_logs"
    
    user_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True)
    action = Column(String(100), nullable=False, index=True) # e.g. user_login, config_update, ticket_scan
    entity_type = Column(String(50), nullable=True) # e.g. User, Ticket, Stadium
    entity_id = Column(Integer, nullable=True)
    details = Column(JSON, nullable=True)
    ip_address = Column(String(45), nullable=True)

class ErrorLog(BaseModel):
    __tablename__ = "error_logs"
    
    error_code = Column(String(50), nullable=False, index=True)
    error_message = Column(Text, nullable=False)
    stack_trace = Column(Text, nullable=True)
    service_name = Column(String(100), nullable=False) # e.g. auth-service, payment-service
    severity = Column(String(50), default="error") # warning, error, critical, fatal
    resolved = Column(Boolean, default=False)

class APIKey(BaseModel):
    __tablename__ = "api_keys"
    
    name = Column(String(100), nullable=False)
    key_hash = Column(String(255), unique=True, index=True, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    scopes = Column(JSON, nullable=True) # List of allowed scopes/roles
    expires_at = Column(DateTime(timezone=True), nullable=True)
    is_active = Column(Boolean, default=True)
    last_used_at = Column(DateTime(timezone=True), nullable=True)

class Configuration(BaseModel):
    __tablename__ = "configurations"
    
    config_key = Column(String(100), unique=True, index=True, nullable=False)
    config_value = Column(JSON, nullable=False)
    description = Column(String(255), nullable=True)
    is_encrypted = Column(Boolean, default=False)

class SystemSetting(BaseModel):
    __tablename__ = "system_settings"
    
    setting_group = Column(String(50), nullable=False, index=True) # e.g. general, security, emails
    setting_key = Column(String(100), unique=True, nullable=False)
    setting_value = Column(String(255), nullable=False)
    data_type = Column(String(20), default="string") # string, integer, boolean, json

class FeatureFlag(BaseModel):
    __tablename__ = "feature_flags"
    
    flag_name = Column(String(100), unique=True, index=True, nullable=False)
    is_enabled = Column(Boolean, default=False)
    description = Column(String(255), nullable=True)
    percentage_rollout = Column(Integer, default=100) # 0 to 100
    target_users = Column(JSON, nullable=True) # List of specific user IDs or roles
