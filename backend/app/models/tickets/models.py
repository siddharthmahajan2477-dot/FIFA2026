from sqlalchemy import Column, String, Integer, ForeignKey, Boolean, DateTime, Numeric
from sqlalchemy.orm import relationship
from backend.app.models.base import BaseModel

class SeatSection(BaseModel):
    __tablename__ = "seat_sections"
    
    stadium_id = Column(Integer, ForeignKey("stadiums.id", ondelete="CASCADE"), nullable=False, index=True)
    name = Column(String(50), nullable=False) # e.g. "Section 101"
    tier = Column(String(50), nullable=True) # Lower, Middle, Upper, VIP
    
    # Relationships
    seats = relationship("Seat", back_populates="section", cascade="all, delete-orphan")

class Seat(BaseModel):
    __tablename__ = "seats"
    
    section_id = Column(Integer, ForeignKey("seat_sections.id", ondelete="CASCADE"), nullable=False, index=True)
    row = Column(String(10), nullable=False)
    number = Column(String(10), nullable=False)
    is_accessible = Column(Boolean, default=False)
    
    # Relationships
    section = relationship("SeatSection", back_populates="seats")
    tickets = relationship("Ticket", back_populates="seat")

class TicketType(BaseModel):
    __tablename__ = "ticket_types"
    
    name = Column(String(100), unique=True, nullable=False) # e.g. "General Admission", "VIP"
    description = Column(String(255), nullable=True)
    base_price = Column(Numeric(10, 2), nullable=False)
    
    # Relationships
    tickets = relationship("Ticket", back_populates="ticket_type")

class Order(BaseModel):
    __tablename__ = "ticket_orders"
    
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    order_number = Column(String(100), unique=True, index=True, nullable=False)
    total_amount = Column(Numeric(10, 2), nullable=False)
    order_status = Column(String(50), default="pending", index=True) # pending, completed, cancelled
    
    # Relationships
    payments = relationship("Payment", back_populates="order", cascade="all, delete-orphan")
    tickets = relationship("Ticket", back_populates="order")

class Payment(BaseModel):
    __tablename__ = "payments"
    
    order_id = Column(Integer, ForeignKey("ticket_orders.id", ondelete="CASCADE"), nullable=False, index=True)
    transaction_id = Column(String(100), unique=True, index=True, nullable=True)
    amount = Column(Numeric(10, 2), nullable=False)
    payment_method = Column(String(50), nullable=False) # credit_card, paypal, crypto
    payment_status = Column(String(50), default="pending", index=True) # pending, successful, failed, refunded
    
    # Relationships
    order = relationship("Order", back_populates="payments")

class Ticket(BaseModel):
    __tablename__ = "tickets"
    
    order_id = Column(Integer, ForeignKey("ticket_orders.id", ondelete="CASCADE"), nullable=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=True, index=True)
    match_id = Column(Integer, ForeignKey("matches.id", ondelete="CASCADE"), nullable=False, index=True)
    seat_id = Column(Integer, ForeignKey("seats.id", ondelete="RESTRICT"), nullable=True, index=True)
    ticket_type_id = Column(Integer, ForeignKey("ticket_types.id", ondelete="RESTRICT"), nullable=False)
    
    barcode = Column(String(255), unique=True, index=True, nullable=False)
    price = Column(Numeric(10, 2), nullable=False)
    ticket_status = Column(String(50), default="active", index=True) # active, used, cancelled, transferred
    
    # Relationships
    order = relationship("Order", back_populates="tickets")
    seat = relationship("Seat", back_populates="tickets")
    ticket_type = relationship("TicketType", back_populates="tickets")

class Coupon(BaseModel):
    __tablename__ = "coupons"
    
    code = Column(String(50), unique=True, index=True, nullable=False)
    discount_percentage = Column(Numeric(5, 2), nullable=True)
    discount_amount = Column(Numeric(10, 2), nullable=True)
    valid_from = Column(DateTime(timezone=True), nullable=True)
    valid_until = Column(DateTime(timezone=True), nullable=True)
    max_uses = Column(Integer, nullable=True)
    current_uses = Column(Integer, default=0)

class Wishlist(BaseModel):
    __tablename__ = "wishlists"
    
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    match_id = Column(Integer, ForeignKey("matches.id", ondelete="CASCADE"), nullable=False, index=True)
    
class Favorite(BaseModel):
    __tablename__ = "favorites"
    
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    item_type = Column(String(50), nullable=False) # e.g. match, player, team
    item_id = Column(Integer, nullable=False)
