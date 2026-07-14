from typing import Any, List, Dict
from backend.app.integrations.gemini.client import GeminiClient
from backend.app.integrations.schemas import IntegrationResponse
from backend.app.integrations.exceptions import IntegrationError

class AIService:
    def __init__(self):
        self.client = GeminiClient()

    async def get_match_prediction(self, match_data: str) -> IntegrationResponse[Any]:
        prompt = f"Analyze this match data and provide a short, expert prediction of the outcome, including key players to watch:\n\n{match_data}"
        
        try:
            response = await self.client.generate_content(prompt)
            return IntegrationResponse(success=True, provider="google_genai", cached=False, data={"prediction": response})
        except IntegrationError as e:
            return IntegrationResponse(success=False, provider="google_genai", cached=False, error=str(e))

    async def get_fan_assistant_response(self, chat_history: List[Dict[str, str]]) -> IntegrationResponse[Any]:
        # Inject system instructions into the first message
        if chat_history and chat_history[0]["role"] == "user":
            chat_history[0]["content"] = (
                "You are the official Fan Assistant for the FIFA World Cup 2026 Smart Stadium Operating System. "
                "Help fans with tickets, navigation, food recommendations, and match stats. Keep answers concise.\n\n"
            ) + chat_history[0]["content"]
            
        try:
            response = await self.client.chat(chat_history)
            return IntegrationResponse(success=True, provider="google_genai", cached=False, data={"response": response})
        except IntegrationError as e:
            return IntegrationResponse(success=False, provider="google_genai", cached=False, error=str(e))
