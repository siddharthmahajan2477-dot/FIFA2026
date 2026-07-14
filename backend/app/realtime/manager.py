import asyncio
from typing import Dict, List, Set
from fastapi import WebSocket
from backend.app.core.logging import logger
from backend.app.integrations.cache import redis_client

class RoomManager:
    """
    Manages active WebSocket connections across multiple workers via Redis Pub/Sub.
    """
    def __init__(self):
        # Maps room names to lists of active WebSockets in this worker
        self.active_rooms: Dict[str, List[WebSocket]] = {}
        # Tracks which Redis pub/sub channels this worker is currently listening to
        self.subscribed_channels: Set[str] = set()
        self.pubsub = redis_client.pubsub()
        self.listen_task: asyncio.Task | None = None

    async def connect(self, websocket: WebSocket, room: str) -> None:
        """
        Accepts a connection and registers it under a specific room.
        Enforces connection limits to prevent DOS.
        """
        if room in self.active_rooms and len(self.active_rooms[room]) >= 5000:
            logger.warning(f"Connection limit reached for room: {room}")
            await websocket.close(code=1008, reason="Room is full")
            return
            
        await websocket.accept()
        if room not in self.active_rooms:
            self.active_rooms[room] = []
        self.active_rooms[room].append(websocket)
        logger.info(f"WebSocket client connected to room: {room} (Total: {len(self.active_rooms[room])})")
        
        # Ensure we are subscribed to the Redis channel for this room
        await self._ensure_subscription(room)

    async def disconnect(self, websocket: WebSocket, room: str) -> None:
        """
        Deregisters a disconnected WebSocket from its room.
        """
        if room in self.active_rooms:
            if websocket in self.active_rooms[room]:
                self.active_rooms[room].remove(websocket)
                logger.info(f"WebSocket client disconnected from room: {room}")
            
            # If no more local clients are in this room, we could unsubscribe from Redis
            # to save bandwidth, but for simplicity we keep the subscription active 
            # or we can unsubscribe. Let's do cleanup.
            if not self.active_rooms[room]:
                del self.active_rooms[room]
                await self._unsubscribe(room)

    async def _ensure_subscription(self, room: str) -> None:
        """Subscribes the worker to a Redis channel if not already subscribed."""
        channel_name = f"stadium_ws:{room}"
        if channel_name not in self.subscribed_channels:
            await self.pubsub.subscribe(channel_name)
            self.subscribed_channels.add(channel_name)
            logger.info(f"Worker subscribed to Redis channel: {channel_name}")
            
            if self.listen_task is None or self.listen_task.done():
                self.listen_task = asyncio.create_task(self._listen_to_redis())

    async def _unsubscribe(self, room: str) -> None:
        """Unsubscribes from a Redis channel."""
        channel_name = f"stadium_ws:{room}"
        if channel_name in self.subscribed_channels:
            await self.pubsub.unsubscribe(channel_name)
            self.subscribed_channels.remove(channel_name)
            logger.info(f"Worker unsubscribed from Redis channel: {channel_name}")

    async def _listen_to_redis(self) -> None:
        """Background task that listens for messages from Redis and broadcasts them locally."""
        try:
            async for message in self.pubsub.listen():
                if message["type"] == "message":
                    channel = message["channel"].decode("utf-8") if isinstance(message["channel"], bytes) else message["channel"]
                    data = message["data"].decode("utf-8") if isinstance(message["data"], bytes) else message["data"]
                    
                    # Extract room name from channel (remove prefix "stadium_ws:")
                    room = channel.replace("stadium_ws:", "")
                    
                    if room in self.active_rooms:
                        # Broadcast to all local websockets in this room
                        disconnected_clients = []
                        for connection in self.active_rooms[room]:
                            try:
                                await connection.send_text(data)
                            except Exception as e:
                                logger.warning(f"Failed to broadcast to local socket on room {room}: {str(e)}")
                                disconnected_clients.append(connection)
                                
                        # Cleanup dead sockets
                        for dead_socket in disconnected_clients:
                            await self.disconnect(dead_socket, room)
                            
        except asyncio.CancelledError:
            logger.info("Redis listener task cancelled.")
        except Exception as e:
            logger.error(f"Error in Redis listener: {e}")
            self.listen_task = None # Allow restart on next connection

# Global connection manager instance
room_manager = RoomManager()
