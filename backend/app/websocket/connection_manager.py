from fastapi import WebSocket
from typing import Dict, Set

class ConnectionManager:
    def __init__(self):
        self.active_rooms: Dict[str, Set[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, room: str):
        await websocket.accept()
        if room not in self.active_rooms:
            self.active_rooms[room] = set()
        self.active_rooms[room].add(websocket)

    def disconnect(self, websocket: WebSocket, room: str):
        if room in self.active_rooms:
            self.active_rooms[room].remove(websocket)
            if not self.active_rooms[room]:
                del self.active_rooms[room]

    async def broadcast_to_room(self, room: str, message: dict):
        if room in self.active_rooms:
            for connection in self.active_rooms[room]:
                try:
                    await connection.send_json(message)
                except Exception:
                    pass

manager = ConnectionManager()
