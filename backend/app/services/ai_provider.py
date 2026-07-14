"""
AI Provider Abstraction Layer
FIFA World Cup 2026 Smart Stadium Operating System

Supports multiple AI providers. Default: Google GenAI.
Switch providers via NEXT_PUBLIC_AI_PROVIDER environment variable.
"""

from __future__ import annotations

import os
import logging
from abc import ABC, abstractmethod
from typing import AsyncGenerator, Optional

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Abstract Base
# ---------------------------------------------------------------------------

class AIModelProvider(ABC):
    """Provider-agnostic AI interface. All concrete providers must implement this."""

    @abstractmethod
    async def chat_completion(self, system_prompt: str, user_prompt: str) -> str:
        """Single-turn text completion."""

    @abstractmethod
    async def stream_completion(
        self, system_prompt: str, user_prompt: str
    ) -> AsyncGenerator[str, None]:
        """Streaming text completion (yields token chunks)."""

    @abstractmethod
    async def function_call(
        self, system_prompt: str, user_prompt: str, tools: list
    ) -> dict:
        """Structured function/tool calling returning a JSON-serialisable dict."""


# ---------------------------------------------------------------------------
# Google GenAI Provider (DEFAULT)
# ---------------------------------------------------------------------------

class GoogleGenAIProvider(AIModelProvider):
    """
    Official Google GenAI SDK integration.
    Requires: pip install google-generativeai
    Env var : GOOGLE_GENAI_API_KEY
    """

    MODEL_NAME = os.getenv("GOOGLE_GENAI_MODEL", "gemini-2.0-flash-exp")

    def __init__(self) -> None:
        api_key = os.getenv("GOOGLE_GENAI_API_KEY")
        if not api_key:
            logger.warning(
                "GOOGLE_GENAI_API_KEY not set — GoogleGenAIProvider will return stubs."
            )
        self._api_key = api_key
        self._client = None
        self._init_client()

    def _init_client(self) -> None:
        if not self._api_key:
            return
        try:
            import google.generativeai as genai  # noqa: PLC0415

            genai.configure(api_key=self._api_key)
            self._client = genai.GenerativeModel(
                model_name=self.MODEL_NAME,
                safety_settings={
                    "HARM_CATEGORY_HARASSMENT": "BLOCK_MEDIUM_AND_ABOVE",
                    "HARM_CATEGORY_HATE_SPEECH": "BLOCK_MEDIUM_AND_ABOVE",
                    "HARM_CATEGORY_SEXUALLY_EXPLICIT": "BLOCK_MEDIUM_AND_ABOVE",
                    "HARM_CATEGORY_DANGEROUS_CONTENT": "BLOCK_MEDIUM_AND_ABOVE",
                },
            )
            logger.info("GoogleGenAIProvider initialised with model: %s", self.MODEL_NAME)
        except ImportError:
            logger.error(
                "google-generativeai package not installed. "
                "Run: pip install google-generativeai"
            )

    async def chat_completion(self, system_prompt: str, user_prompt: str) -> str:
        if not self._client:
            return "[GoogleGenAI unavailable — API key or package missing]"
        try:
            full_prompt = f"{system_prompt}\n\n{user_prompt}"
            response = self._client.generate_content(full_prompt)
            return response.text
        except Exception as exc:
            logger.error("GoogleGenAI chat_completion error: %s", exc)
            raise

    async def stream_completion(
        self, system_prompt: str, user_prompt: str
    ) -> AsyncGenerator[str, None]:
        if not self._client:
            yield "[GoogleGenAI streaming unavailable]"
            return
        try:
            full_prompt = f"{system_prompt}\n\n{user_prompt}"
            response = self._client.generate_content(full_prompt, stream=True)
            for chunk in response:
                if chunk.text:
                    yield chunk.text
        except Exception as exc:
            logger.error("GoogleGenAI stream_completion error: %s", exc)
            raise

    async def function_call(
        self, system_prompt: str, user_prompt: str, tools: list
    ) -> dict:
        if not self._client:
            return {"error": "GoogleGenAI unavailable"}
        try:
            import google.generativeai as genai  # noqa: PLC0415

            model = genai.GenerativeModel(
                model_name=self.MODEL_NAME,
                tools=tools,
            )
            full_prompt = f"{system_prompt}\n\n{user_prompt}"
            response = model.generate_content(full_prompt)
            # Extract first function call if present
            for candidate in response.candidates:
                for part in candidate.content.parts:
                    if part.function_call:
                        return {
                            "name": part.function_call.name,
                            "args": dict(part.function_call.args),
                        }
            return {"text": response.text}
        except Exception as exc:
            logger.error("GoogleGenAI function_call error: %s", exc)
            raise


# ---------------------------------------------------------------------------
# OpenAI Provider
# ---------------------------------------------------------------------------

class OpenAIProvider(AIModelProvider):
    """
    OpenAI GPT provider.
    Env var: OPENAI_API_KEY
    """

    async def chat_completion(self, system_prompt: str, user_prompt: str) -> str:
        return f"[OpenAI stub] {user_prompt}"

    async def stream_completion(
        self, system_prompt: str, user_prompt: str
    ) -> AsyncGenerator[str, None]:
        yield f"[OpenAI streaming stub] {user_prompt}"

    async def function_call(
        self, system_prompt: str, user_prompt: str, tools: list
    ) -> dict:
        return {"stub": "OpenAI function_call not yet wired"}


# ---------------------------------------------------------------------------
# Anthropic Claude Provider
# ---------------------------------------------------------------------------

class ClaudeProvider(AIModelProvider):
    """
    Anthropic Claude provider.
    Env var: ANTHROPIC_API_KEY
    """

    async def chat_completion(self, system_prompt: str, user_prompt: str) -> str:
        return f"[Claude stub] {user_prompt}"

    async def stream_completion(
        self, system_prompt: str, user_prompt: str
    ) -> AsyncGenerator[str, None]:
        yield f"[Claude streaming stub] {user_prompt}"

    async def function_call(
        self, system_prompt: str, user_prompt: str, tools: list
    ) -> dict:
        return {"stub": "Claude function_call not yet wired"}


# ---------------------------------------------------------------------------
# Groq Provider
# ---------------------------------------------------------------------------

class GroqProvider(AIModelProvider):
    async def chat_completion(self, system_prompt: str, user_prompt: str) -> str:
        return f"[Groq stub] {user_prompt}"

    async def stream_completion(
        self, system_prompt: str, user_prompt: str
    ) -> AsyncGenerator[str, None]:
        yield f"[Groq streaming stub] {user_prompt}"

    async def function_call(
        self, system_prompt: str, user_prompt: str, tools: list
    ) -> dict:
        return {"stub": "Groq function_call not yet wired"}


# ---------------------------------------------------------------------------
# Mistral Provider
# ---------------------------------------------------------------------------

class MistralProvider(AIModelProvider):
    async def chat_completion(self, system_prompt: str, user_prompt: str) -> str:
        return f"[Mistral stub] {user_prompt}"

    async def stream_completion(
        self, system_prompt: str, user_prompt: str
    ) -> AsyncGenerator[str, None]:
        yield f"[Mistral streaming stub] {user_prompt}"

    async def function_call(
        self, system_prompt: str, user_prompt: str, tools: list
    ) -> dict:
        return {"stub": "Mistral function_call not yet wired"}


# ---------------------------------------------------------------------------
# DeepSeek Provider
# ---------------------------------------------------------------------------

class DeepSeekProvider(AIModelProvider):
    async def chat_completion(self, system_prompt: str, user_prompt: str) -> str:
        return f"[DeepSeek stub] {user_prompt}"

    async def stream_completion(
        self, system_prompt: str, user_prompt: str
    ) -> AsyncGenerator[str, None]:
        yield f"[DeepSeek streaming stub] {user_prompt}"

    async def function_call(
        self, system_prompt: str, user_prompt: str, tools: list
    ) -> dict:
        return {"stub": "DeepSeek function_call not yet wired"}


# ---------------------------------------------------------------------------
# Provider Factory
# ---------------------------------------------------------------------------

_PROVIDER_MAP: dict[str, type[AIModelProvider]] = {
    "google_genai": GoogleGenAIProvider,
    "openai": OpenAIProvider,
    "claude": ClaudeProvider,
    "groq": GroqProvider,
    "mistral": MistralProvider,
    "deepseek": DeepSeekProvider,
}

def get_ai_provider(provider_name: Optional[str] = None) -> AIModelProvider:
    """
    Instantiate and return the configured AI provider.
    Defaults to GoogleGenAIProvider if no override is given.
    """
    name = (provider_name or os.getenv("AI_PROVIDER", "google_genai")).lower()
    provider_cls = _PROVIDER_MAP.get(name)
    if provider_cls is None:
        logger.warning(
            "Unknown AI provider '%s'. Falling back to GoogleGenAIProvider.", name
        )
        provider_cls = GoogleGenAIProvider
    logger.info("AI provider resolved to: %s", provider_cls.__name__)
    return provider_cls()
