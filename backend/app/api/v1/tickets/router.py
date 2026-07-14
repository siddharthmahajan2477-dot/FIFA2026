from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Dict, Any
from pydantic import BaseModel
from backend.app.database.session import get_db_session as get_db

router = APIRouter()

class TicketPurchaseRequest(BaseModel):
    match_id: str
    category: str = "Category 1"
    quantity: int = 1

@router.get("/")
async def get_tickets(db: AsyncSession = Depends(get_db)):
    """Retrieve user tickets for upcoming matches."""
    return [
        {
            "id": "TCK-882194",
            "match": "USA vs Mexico",
            "venue": "MetLife Stadium",
            "gate": "Gate A",
            "section": "104",
            "row": "12",
            "seat": "18",
            "category": "Category 1",
            "price": 250.00,
            "status": "VALID",
            "nfc_pass_issued": True,
            "qr_code_token": "NFC_FWC2026_TCK_882194_METLIFE"
        }
    ]

@router.post("/purchase")
async def purchase_ticket(purchase: TicketPurchaseRequest, db: AsyncSession = Depends(get_db)):
    """Reserve and issue digital NFC match ticket."""
    return {
        "status": "success",
        "ticket_id": "TCK-994321",
        "match_id": purchase.match_id,
        "category": purchase.category,
        "quantity": purchase.quantity,
        "message": "Ticket purchased successfully! Added to digital wallet."
    }
