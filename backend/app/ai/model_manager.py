from google import genai
from google.genai import types
from typing import AsyncGenerator, Dict, Any, List, Optional
from tenacity import retry, stop_after_attempt, wait_exponential
from backend.app.core.config import settings
from backend.app.core.logging import logger

class ModelManager:
    """
    Enterprise Model Manager abstracting specific LLM configurations.
    Configured primarily for google-genai but architected to allow
    OpenAI/Claude extensions in the future based on settings.AI_PROVIDER.
    """
    def __init__(self):
        # Normalize provider comparison (e.g. google_genai or Google Gemini)
        raw_provider = settings.AI_PROVIDER or "google_genai"
        self.provider = raw_provider.lower().replace(" ", "_").strip()
        
        if not settings.GOOGLE_GENAI_API_KEY:
            logger.warning("GOOGLE_GENAI_API_KEY not set!")
        self.client = genai.Client(api_key=settings.GOOGLE_GENAI_API_KEY)
        self.model_name = settings.GOOGLE_GENAI_MODEL or "gemini-2.5-flash"

    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=2, max=10),
        reraise=True
    )
    async def generate_response(self, prompt: str, system_instruction: str, tools: Optional[List[Any]] = None) -> str:
        """Generate a single text response with exponential backoff retry logic."""
        try:
            config = types.GenerateContentConfig(
                system_instruction=system_instruction,
                temperature=0.7,
            )
            response = await self.client.aio.models.generate_content(
                model=self.model_name,
                contents=prompt,
                config=config
            )
            return response.text
        except Exception as e:
            logger.error(f"AI Generation Error (attempting retry if possible): {e}")
            raise

    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=2, max=10),
        reraise=True
    )
    async def generate_chat(self, messages: List[Dict[str, str]], system_instruction: str, tools: Optional[List[Any]] = None) -> str:
        """Process a conversation history with exponential backoff retry logic."""
        try:
            formatted_contents = []
            for msg in messages:
                formatted_contents.append(
                    types.Content(
                        role="user" if msg["role"] == "user" else "model",
                        parts=[types.Part.from_text(text=msg["content"])]
                    )
                )
            
            config = types.GenerateContentConfig(
                system_instruction=system_instruction,
                temperature=0.7,
            )
            
            response = await self.client.aio.models.generate_content(
                model=self.model_name,
                contents=formatted_contents,
                config=config
            )
            return response.text
        except Exception as e:
            logger.error(f"AI Chat Error (attempting retry if possible): {e}")
            raise

    async def generate_stream(self, messages: List[Dict[str, str]], system_instruction: str, tools: Optional[List[Any]] = None) -> AsyncGenerator[str, None]:
        """Process a conversation history and yield streaming chunks."""
        try:
            formatted_contents = []
            for msg in messages:
                formatted_contents.append(
                    types.Content(
                        role="user" if msg["role"] == "user" else "model",
                        parts=[types.Part.from_text(text=msg["content"])]
                    )
                )
            
            config = types.GenerateContentConfig(
                system_instruction=system_instruction,
                temperature=0.7,
            )
            
            response_stream = await self.client.aio.models.generate_content_stream(
                model=self.model_name,
                contents=formatted_contents,
                config=config
            )
            
            async for chunk in response_stream:
                if chunk.text:
                    yield chunk.text
        except Exception as e:
            logger.error(f"AI Streaming Error: {e}")
            yield f"\n[System Error: Failed to generate response ({e})]"

model_manager = ModelManager()
