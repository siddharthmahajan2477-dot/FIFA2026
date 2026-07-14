from typing import AsyncGenerator, Optional
from backend.app.ai.model_manager import model_manager
from backend.app.ai.agents import PromptEngine, AgentType
from backend.app.ai.tools import AVAILABLE_TOOLS
from backend.app.ai.memory import memory_manager
from backend.app.core.logging import logger

class AIGateway:
    """
    Central orchestrator for AI requests.
    Combines memory, specific agent prompts, tools, and streams/responses.
    """

    async def chat(self, session_id: str, agent_type: str, user_message: str, language: str = "en") -> str:
        """Process a single chat request, using memory and returning a complete response."""
        system_instruction = PromptEngine.get_system_prompt(agent_type)
        if language != "en":
            system_instruction += f"\nCRITICAL: You must respond in the {language} language."
            
        tools = AVAILABLE_TOOLS.get(agent_type.lower(), [])
        
        await memory_manager.append_message(session_id, "user", user_message)
        history = await memory_manager.get_history(session_id)
        
        try:
            response_text = await model_manager.generate_chat(
                messages=history,
                system_instruction=system_instruction,
                tools=tools
            )
            await memory_manager.append_message(session_id, "model", response_text)
            return response_text
        except Exception as e:
            logger.error(f"Gateway Chat Error: {e}")
            return "I'm currently experiencing a technical difficulty. Please try again later."

    async def stream_chat(self, session_id: str, agent_type: str, user_message: str, language: str = "en") -> AsyncGenerator[str, None]:
        """Process a chat request, yielding streaming chunks and updating memory when complete."""
        system_instruction = PromptEngine.get_system_prompt(agent_type)
        if language != "en":
            system_instruction += f"\nCRITICAL: You must respond in the {language} language."
            
        tools = AVAILABLE_TOOLS.get(agent_type.lower(), [])
        
        await memory_manager.append_message(session_id, "user", user_message)
        history = await memory_manager.get_history(session_id)
        
        full_response = ""
        try:
            async for chunk in model_manager.generate_stream(
                messages=history,
                system_instruction=system_instruction,
                tools=tools
            ):
                full_response += chunk
                yield chunk
                
            # Once stream finishes cleanly, append to memory
            await memory_manager.append_message(session_id, "model", full_response)
        except Exception as e:
            logger.error(f"Gateway Streaming Error: {e}")
            yield "\n[Connection interrupted. Please try again.]"

ai_gateway = AIGateway()
