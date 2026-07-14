from abc import ABC, abstractmethod
from typing import Dict, Any

class PaymentGateway(ABC):
    @abstractmethod
    async def create_charge_session(self, amount: float, currency: str) -> Dict[str, Any]:
        pass

class StripeGateway(PaymentGateway):
    async def create_charge_session(self, amount: float, currency: str) -> Dict[str, Any]:
        return {"session_id": "stripe_session_id_placeholder", "url": "https://stripe.com/checkout"}

class PaymentService:
    def __init__(self, gateway: PaymentGateway):
        self.gateway = gateway

    async def initiate_payment(self, amount: float) -> Dict[str, Any]:
        return await self.gateway.create_charge_session(amount, "USD")
