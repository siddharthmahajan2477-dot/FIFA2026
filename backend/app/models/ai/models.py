from sqlalchemy import Column, String, Integer, ForeignKey, Boolean, Numeric, Text, JSON, DateTime
from sqlalchemy.orm import relationship
from backend.app.models.base import BaseModel

class AIConversation(BaseModel):
    __tablename__ = "ai_conversations"
    
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    title = Column(String(255), nullable=True)
    context_type = Column(String(50), nullable=True) # e.g. general, ticketing, navigation
    is_active = Column(Boolean, default=True)
    
    # Relationships
    messages = relationship("AIMessage", back_populates="conversation", cascade="all, delete-orphan")

class AIMessage(BaseModel):
    __tablename__ = "ai_messages"
    
    conversation_id = Column(Integer, ForeignKey("ai_conversations.id", ondelete="CASCADE"), nullable=False, index=True)
    sender_type = Column(String(50), nullable=False) # user, ai, system
    content = Column(Text, nullable=False)
    tokens_used = Column(Integer, default=0)
    metadata_json = Column(JSON, nullable=True) # citations, function calls
    
    # Relationships
    conversation = relationship("AIConversation", back_populates="messages")

class Recommendation(BaseModel):
    __tablename__ = "recommendations"
    
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    recommendation_type = Column(String(50), nullable=False) # food, merch, route, event
    target_id = Column(Integer, nullable=True) # e.g. MenuItem ID, Product ID
    score = Column(Numeric(5, 4), nullable=True) # Confidence score
    is_dismissed = Column(Boolean, default=False)
    is_actioned = Column(Boolean, default=False)

class Prediction(BaseModel):
    __tablename__ = "predictions"
    
    target_type = Column(String(50), nullable=False) # crowd_density, traffic, match_outcome, queue_wait
    target_id = Column(Integer, nullable=True)
    prediction_timestamp = Column(DateTime(timezone=True), nullable=False)
    predicted_value = Column(JSON, nullable=False)
    confidence_interval = Column(JSON, nullable=True)
    actual_value = Column(JSON, nullable=True) # populated later for accuracy tracking

class Insight(BaseModel):
    __tablename__ = "insights"
    
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    insight_category = Column(String(50), nullable=False) # operational, financial, engagement
    data_points = Column(JSON, nullable=True)
    generated_at = Column(DateTime(timezone=True), nullable=False)

class Feedback(BaseModel):
    __tablename__ = "ai_feedback"
    
    user_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True)
    feature = Column(String(50), nullable=False) # chatbot, recommendation
    reference_id = Column(Integer, nullable=True) # e.g. AIMessage ID
    rating = Column(Integer, nullable=False) # 1 to 5
    comment = Column(Text, nullable=True)
