export const API_CONFIG = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  socketUrl: process.env.NEXT_PUBLIC_SOCKET_URL || 'ws://localhost:8000',
  mapApiKey: process.env.NEXT_PUBLIC_MAP_API_KEY || '',
}
