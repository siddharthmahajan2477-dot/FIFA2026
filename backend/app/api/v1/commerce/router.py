from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List, Dict, Any
from pydantic import BaseModel
from backend.app.database.session import get_db_session as get_db

router = APIRouter()

# Schemas
class OrderRequest(BaseModel):
    items: List[Dict[str, Any]]
    total_amount: float
    delivery_location: str = "Seat"

class CheckoutRequest(BaseModel):
    amount: float
    currency: str = "USD"
    payment_method: str = "card"

@router.get("/food/menu")
async def get_food_menu(db: AsyncSession = Depends(get_db)):
    """Retrieve available food and beverage options."""
    return [
        {"id": "f1", "name": "Gourmet Stadium Burger", "category": "Food", "price": 14.50, "rating": 4.8, "prep_time": "8-10 min", "popular": True, "image": "/placeholder-burger.jpg"},
        {"id": "f2", "name": "Artisanal Pepperoni Pizza", "category": "Food", "price": 16.00, "rating": 4.7, "prep_time": "10-12 min", "popular": True, "image": "/placeholder-pizza.jpg"},
        {"id": "f3", "name": "Craft IPA Beer (16oz)", "category": "Beverage", "price": 9.50, "rating": 4.9, "prep_time": "2 min", "popular": True, "image": "/placeholder-beer.jpg"},
        {"id": "f4", "name": "Nachos Supreme Platter", "category": "Food", "price": 12.00, "rating": 4.6, "prep_time": "5 min", "popular": False, "image": "/placeholder-nachos.jpg"},
        {"id": "f5", "name": "Fountain Soda & Refill", "category": "Beverage", "price": 5.50, "rating": 4.5, "prep_time": "1 min", "popular": False, "image": "/placeholder-soda.jpg"}
    ]

@router.post("/food/place-order")
async def place_food_order(order: OrderRequest, db: AsyncSession = Depends(get_db)):
    """Submit a food & beverage order."""
    return {
        "status": "success",
        "order_id": "ORD-2026-8849",
        "message": "Order placed successfully! Estimated delivery in 12 mins.",
        "details": order.dict()
    }

@router.get("/food/orders")
async def get_food_orders(db: AsyncSession = Depends(get_db)):
    """Retrieve active and historical food orders."""
    return [
        {"id": "ORD-2026-8849", "status": "Preparing", "total": 24.00, "items": ["Gourmet Stadium Burger", "Craft IPA Beer"], "timestamp": "2026-06-11T18:30:00Z"},
        {"id": "ORD-2026-7721", "status": "Delivered", "total": 17.50, "items": ["Nachos Supreme Platter", "Fountain Soda"], "timestamp": "2026-06-11T16:15:00Z"}
    ]

@router.get("/merchandise/catalog")
async def get_merchandise_catalog(db: AsyncSession = Depends(get_db)):
    """Retrieve official FIFA World Cup 2026 merchandise."""
    return [
        {"id": "m1", "name": "Official World Cup 2026 Match Jersey", "category": "Apparel", "price": 120.00, "in_stock": True, "badge": "Official Kit", "image": "/placeholder-jersey.jpg"},
        {"id": "m2", "name": "Official Adidas Competition Match Ball", "category": "Equipment", "price": 165.00, "in_stock": True, "badge": "Collector Item", "image": "/placeholder-ball.jpg"},
        {"id": "m3", "name": "Commemorative Final Match Scarf", "category": "Accessories", "price": 35.00, "in_stock": True, "badge": "Popular", "image": "/placeholder-scarf.jpg"},
        {"id": "m4", "name": "Smart Stadium NFC Fan Bracelet", "category": "Tech", "price": 25.00, "in_stock": True, "badge": "Smart Feature", "image": "/placeholder-wristband.jpg"}
    ]

@router.post("/merchandise/purchase")
async def purchase_merchandise(items: List[Dict[str, Any]], db: AsyncSession = Depends(get_db)):
    """Execute merchandise purchase."""
    return {
        "status": "success",
        "transaction_id": "TXN-MERCH-99321",
        "message": "Purchase successful. Express pickup available at Gate A Merchandise Hub.",
        "items_count": len(items)
    }

@router.post("/payment/initiate-checkout")
async def initiate_checkout(checkout: CheckoutRequest, db: AsyncSession = Depends(get_db)):
    """Process order payment checkout session."""
    return {
        "status": "success",
        "checkout_id": "CHK-SESSION-448291",
        "client_secret": "sec_test_mock_payment_token_2026",
        "amount": checkout.amount,
        "currency": checkout.currency
    }
