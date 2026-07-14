import google.generativeai as genai
from typing import Any, List, Dict
from backend.app.core.config import settings
from backend.app.integrations.exceptions import IntegrationError, ProviderUnavailableError
import logging

logger = logging.getLogger(__name__)

class GeminiClient:
    def __init__(self):
        if not settings.GOOGLE_GENAI_API_KEY:
            logger.warning("Google GenAI API Key is not set.")
        
        genai.configure(api_key=settings.GOOGLE_GENAI_API_KEY)
        self.model = genai.GenerativeModel(settings.GOOGLE_GENAI_MODEL)

    async def generate_content(self, prompt: str) -> str:
        """Generate text from a prompt asynchronously."""
        try:
            response = await self.model.generate_content_async(prompt)
            return response.text
        except Exception as e:
            logger.error(f"Gemini API Error: {e}")
            raise ProviderUnavailableError(f"Failed to generate content: {e}")

    async def chat(self, messages: List[Dict[str, str]]) -> str:
        """Handle a conversation. Messages should be standard format."""
        try:
            # Note: google.generativeai has specific chat session formats, 
            # we adapt the standard generic message format to it.
            formatted_history = []
            for msg in messages[:-1]:
                formatted_history.append({
                    "role": "user" if msg["role"] == "user" else "model",
                    "parts": [msg["content"]]
                })
                
            chat_session = self.model.start_chat(history=formatted_history)
            response = await chat_session.send_message_async(messages[-1]["content"])
            return response.text
        except Exception as e:
            logger.error(f"Gemini Chat Error: {e}")
            raise ProviderUnavailableError(f"Failed to process chat: {e}")
