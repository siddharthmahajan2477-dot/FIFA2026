from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import uuid

from backend.app.ai.gateway import ai_gateway
from backend.app.ai.agents import AgentType
from backend.app.middleware.auth import get_current_user

router = APIRouter(prefix="/ai", tags=["AI Intelligence Platform"])

class ChatRequest(BaseModel):
    message: str
    agent_type: str = "default"
    session_id: str = None
    language: str = "en"
    stream: bool = False

@router.post("/chat")
async def chat_endpoint(request: ChatRequest, current_user = Depends(get_current_user)):
    """
    Interact with a specific AI agent using backend decision intelligence.
    Supports standard responses and Server-Sent Events (SSE) streaming.
    """
    # Create a unique session per user if not provided
    session_id = request.session_id or f"user_{current_user.id}_session_{uuid.uuid4().hex[:8]}"
    
    try:
        agent_type_enum = AgentType(request.agent_type.lower())
    except ValueError:
        agent_type_enum = AgentType.DEFAULT
        
    if request.stream:
        async def event_generator():
            try:
                async for chunk in ai_gateway.stream_chat(
                    session_id=session_id,
                    agent_type=agent_type_enum,
                    user_message=request.message,
                    language=request.language
                ):
                    yield f"data: {chunk}\n\n"
            except Exception as e:
                yield f"data: [Error: {str(e)}]\n\n"
            finally:
                yield "data: [DONE]\n\n"
                
        return StreamingResponse(event_generator(), media_type="text/event-stream")
    else:
        response_text = await ai_gateway.chat(
            session_id=session_id,
            agent_type=agent_type_enum,
            user_message=request.message,
            language=request.language
        )
        return {"session_id": session_id, "response": response_text}
