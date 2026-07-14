import google.generativeai as genai
from typing import AsyncGenerator, Dict, Any, List, Optional
from backend.app.core.config import settings
from backend.app.core.logging import logger

class ModelManager:
    """
    Enterprise Model Manager abstracting specific LLM configurations.
    Configured primarily for google-genai but architected to allow
    OpenAI/Claude extensions in the future based on settings.AI_PROVIDER.
    """
    def __init__(self):
        self.provider = settings.AI_PROVIDER
        if self.provider == "google_genai":
            if not settings.GOOGLE_GENAI_API_KEY:
                logger.warning("GOOGLE_GENAI_API_KEY not set!")
            genai.configure(api_key=settings.GOOGLE_GENAI_API_KEY)
            self.model_name = settings.GOOGLE_GENAI_MODEL
        else:
            logger.warning(f"AI Provider {self.provider} not natively mapped yet. Defaulting to Gemini.")
            genai.configure(api_key=settings.GOOGLE_GENAI_API_KEY)
            self.model_name = settings.GOOGLE_GENAI_MODEL

    def _get_model(self, system_instruction: str, tools: Optional[List[Any]] = None) -> genai.GenerativeModel:
        """Returns a configured GenerativeModel instance with tools and system instructions."""
        # Convert functions to Gemini tool format if provided
        return genai.GenerativeModel(
            model_name=self.model_name,
            system_instruction=system_instruction,
            tools=tools or []
        )

    async def generate_response(self, prompt: str, system_instruction: str, tools: Optional[List[Any]] = None) -> str:
        """Generate a single text response."""
        try:
            model = self._get_model(system_instruction, tools)
            response = await model.generate_content_async(prompt)
            return response.text
        except Exception as e:
            logger.error(f"AI Generation Error: {e}")
            raise

    async def generate_chat(self, messages: List[Dict[str, str]], system_instruction: str, tools: Optional[List[Any]] = None) -> str:
        """Process a conversation history."""
        model = self._get_model(system_instruction, tools)
        
        # Convert standardized {"role": "user"/"model", "content": "..."} to Gemini format
        formatted_history = []
        for msg in messages[:-1]:
            formatted_history.append({
                "role": "user" if msg["role"] == "user" else "model",
                "parts": [msg["content"]]
            })
            
        try:
            chat_session = model.start_chat(history=formatted_history)
            response = await chat_session.send_message_async(messages[-1]["content"])
            return response.text
        except Exception as e:
            logger.error(f"AI Chat Error: {e}")
            raise

    async def generate_stream(self, messages: List[Dict[str, str]], system_instruction: str, tools: Optional[List[Any]] = None) -> AsyncGenerator[str, None]:
        """Process a conversation history and yield streaming chunks."""
        model = self._get_model(system_instruction, tools)
        
        formatted_history = []
        for msg in messages[:-1]:
            formatted_history.append({
                "role": "user" if msg["role"] == "user" else "model",
                "parts": [msg["content"]]
            })
            
        try:
            chat_session = model.start_chat(history=formatted_history)
            response = await chat_session.send_message_async(messages[-1]["content"], stream=True)
            
            async for chunk in response:
                if chunk.text:
                    yield chunk.text
        except Exception as e:
            logger.error(f"AI Streaming Error: {e}")
            yield f"\n[System Error: Failed to generate response ({e})]"

model_manager = ModelManager()
