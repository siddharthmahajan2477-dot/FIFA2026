export const API_CONFIG = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'https://fifa-smart-stadium-backend.onrender.com',
  socketUrl: process.env.NEXT_PUBLIC_SOCKET_URL || process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'wss://fifa-smart-stadium-backend.onrender.com/ws',
  mapApiKey: process.env.NEXT_PUBLIC_MAP_API_KEY || '',
}
