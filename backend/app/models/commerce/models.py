from sqlalchemy import Column, String, Integer, ForeignKey, Boolean, Numeric, Text
from sqlalchemy.orm import relationship
from backend.app.models.base import BaseModel

class Restaurant(BaseModel):
    __tablename__ = "restaurants"
    
    stadium_id = Column(Integer, ForeignKey("stadiums.id", ondelete="CASCADE"), nullable=False, index=True)
    name = Column(String(100), nullable=False)
    description = Column(String(255), nullable=True)
    location_id = Column(Integer, ForeignKey("locations.id", ondelete="SET NULL"), nullable=True)
    is_open = Column(Boolean, default=True)
    
    # Relationships
    menu_items = relationship("MenuItem", back_populates="restaurant", cascade="all, delete-orphan")
    queue_status = relationship("QueueStatus", uselist=False, back_populates="restaurant", cascade="all, delete-orphan")

class FoodCategory(BaseModel):
    __tablename__ = "food_categories"
    
    name = Column(String(100), unique=True, nullable=False)
    description = Column(String(255), nullable=True)
    
    # Relationships
    menu_items = relationship("MenuItem", back_populates="category")

class MenuItem(BaseModel):
    __tablename__ = "menu_items"
    
    restaurant_id = Column(Integer, ForeignKey("restaurants.id", ondelete="CASCADE"), nullable=False, index=True)
    category_id = Column(Integer, ForeignKey("food_categories.id", ondelete="SET NULL"), nullable=True, index=True)
    name = Column(String(100), nullable=False)
    description = Column(String(255), nullable=True)
    price = Column(Numeric(10, 2), nullable=False)
    is_available = Column(Boolean, default=True)
    image_url = Column(String(255), nullable=True)
    
    # Relationships
    restaurant = relationship("Restaurant", back_populates="menu_items")
    category = relationship("FoodCategory", back_populates="menu_items")

class MerchCategory(BaseModel):
    __tablename__ = "merch_categories"
    
    name = Column(String(100), unique=True, nullable=False)
    description = Column(String(255), nullable=True)
    
    # Relationships
    products = relationship("Product", back_populates="category")

class Product(BaseModel):
    __tablename__ = "products"
    
    category_id = Column(Integer, ForeignKey("merch_categories.id", ondelete="SET NULL"), nullable=True, index=True)
    name = Column(String(100), nullable=False)
    description = Column(Text, nullable=True)
    price = Column(Numeric(10, 2), nullable=False)
    image_url = Column(String(255), nullable=True)
    
    # Relationships
    category = relationship("MerchCategory", back_populates="products")
    inventory = relationship("Inventory", uselist=False, back_populates="product", cascade="all, delete-orphan")
    reviews = relationship("Review", back_populates="product", cascade="all, delete-orphan")

class Inventory(BaseModel):
    __tablename__ = "inventory"
    
    product_id = Column(Integer, ForeignKey("products.id", ondelete="CASCADE"), unique=True, nullable=False)
    stock_quantity = Column(Integer, default=0)
    reserved_quantity = Column(Integer, default=0)
    restock_threshold = Column(Integer, default=10)
    
    # Relationships
    product = relationship("Product", back_populates="inventory")

class CommerceOrder(BaseModel):
    __tablename__ = "commerce_orders"
    
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    order_type = Column(String(50), nullable=False) # food, merchandise
    total_amount = Column(Numeric(10, 2), nullable=False)
    order_status = Column(String(50), default="pending", index=True) # pending, preparing, ready, delivered, cancelled
    seat_delivery = Column(Boolean, default=False)
    seat_id = Column(Integer, ForeignKey("seats.id", ondelete="SET NULL"), nullable=True)
    
    # Relationships
    items = relationship("CommerceOrderItem", back_populates="order", cascade="all, delete-orphan")
    delivery_status = relationship("DeliveryStatus", uselist=False, back_populates="order", cascade="all, delete-orphan")

class CommerceOrderItem(BaseModel):
    __tablename__ = "commerce_order_items"
    
    order_id = Column(Integer, ForeignKey("commerce_orders.id", ondelete="CASCADE"), nullable=False, index=True)
    item_type = Column(String(50), nullable=False) # menu_item, product
    item_id = Column(Integer, nullable=False, index=True) # ID of the MenuItem or Product
    quantity = Column(Integer, nullable=False, default=1)
    unit_price = Column(Numeric(10, 2), nullable=False)
    
    # Relationships
    order = relationship("CommerceOrder", back_populates="items")

class DeliveryStatus(BaseModel):
    __tablename__ = "delivery_statuses"
    
    order_id = Column(Integer, ForeignKey("commerce_orders.id", ondelete="CASCADE"), unique=True, nullable=False)
    delivery_person_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    status = Column(String(50), default="pending", index=True) # pending, assigned, picked_up, on_the_way, delivered
    estimated_arrival_minutes = Column(Integer, nullable=True)
    
    # Relationships
    order = relationship("CommerceOrder", back_populates="delivery_status")

class QueueStatus(BaseModel):
    __tablename__ = "queue_statuses"
    
    restaurant_id = Column(Integer, ForeignKey("restaurants.id", ondelete="CASCADE"), unique=True, nullable=False)
    current_queue_length = Column(Integer, default=0)
    estimated_wait_minutes = Column(Integer, default=0)
    
    # Relationships
    restaurant = relationship("Restaurant", back_populates="queue_status")

class Review(BaseModel):
    __tablename__ = "reviews"
    
    product_id = Column(Integer, ForeignKey("products.id", ondelete="CASCADE"), nullable=False, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    rating = Column(Integer, nullable=False) # 1 to 5
    comment = Column(Text, nullable=True)
    
    # Relationships
    product = relationship("Product", back_populates="reviews")
