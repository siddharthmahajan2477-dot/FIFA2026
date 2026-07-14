from typing import Dict, List
from fastapi import WebSocket
from backend.app.core.logging import logger

class ConnectionManager:
    """
    Manages active WebSocket connections, supporting rooms/channels and broadcasting.
    """
    def __init__(self):
        # Maps channel/room names to lists of active WebSockets
        self.active_connections: Dict[str, List[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, channel: str) -> None:
        """
        Accepts a connection and registers it under a specific channel or room.
        """
        await websocket.accept()
        if channel not in self.active_connections:
            self.active_connections[channel] = []
        self.active_connections[channel].append(websocket)
        logger.info(f"WebSocket client registered on channel: {channel} (Total: {len(self.active_connections[channel])})")

    def disconnect(self, websocket: WebSocket, channel: str) -> None:
        """
        Deregisters a disconnected WebSocket from its channel.
        """
        if channel in self.active_connections:
            if websocket in self.active_connections[channel]:
                self.active_connections[channel].remove(websocket)
                logger.info(f"WebSocket client disconnected from channel: {channel}")
            if not self.active_connections[channel]:
                del self.active_connections[channel]

    async def send_personal_message(self, message: str, websocket: WebSocket) -> None:
        """
        Sends a direct message to a single connected client.
        """
        await websocket.send_text(message)

    async def broadcast(self, message: str, channel: str) -> None:
        """
        Broadcasts a text payload to all active clients subscribed to a given channel.
        """
        if channel in self.active_connections:
            for connection in self.active_connections[channel]:
                try:
                    await connection.send_text(message)
                except Exception as e:
                    logger.warning(f"Failed to broadcast to socket client on channel {channel}: {str(e)}")
                    # Disconnection cleanup will happen on receive loop error

# Global connection manager instance
ws_manager = ConnectionManager()
