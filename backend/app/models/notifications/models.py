from sqlalchemy import Column, String, Integer, ForeignKey, Boolean, Text, JSON, DateTime
from sqlalchemy.orm import relationship
from backend.app.models.base import BaseModel

class NotificationTemplate(BaseModel):
    __tablename__ = "notification_templates"
    
    name = Column(String(100), unique=True, nullable=False)
    notification_type = Column(String(50), nullable=False) # email, sms, push, in_app
    subject_template = Column(String(255), nullable=True)
    body_template = Column(Text, nullable=False)
    default_variables = Column(JSON, nullable=True)

class Notification(BaseModel):
    __tablename__ = "notifications"
    
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    template_id = Column(Integer, ForeignKey("notification_templates.id", ondelete="SET NULL"), nullable=True)
    notification_type = Column(String(50), nullable=False) # email, sms, push, in_app
    title = Column(String(255), nullable=False)
    body = Column(Text, nullable=False)
    action_url = Column(String(255), nullable=True)
    is_read = Column(Boolean, default=False, index=True)
    read_at = Column(DateTime(timezone=True), nullable=True)

class NotificationLog(BaseModel):
    __tablename__ = "notification_logs"
    
    notification_id = Column(Integer, ForeignKey("notifications.id", ondelete="SET NULL"), nullable=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    channel = Column(String(50), nullable=False) # email, sms, push
    status = Column(String(50), nullable=False) # sent, delivered, failed, bounced
    provider_response = Column(JSON, nullable=True)
    sent_at = Column(DateTime(timezone=True), nullable=True)

class PushSubscription(BaseModel):
    __tablename__ = "push_subscriptions"
    
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    device_type = Column(String(50), nullable=False) # ios, android, web
    fcm_token = Column(String(255), unique=True, nullable=False)
    is_active = Column(Boolean, default=True)
