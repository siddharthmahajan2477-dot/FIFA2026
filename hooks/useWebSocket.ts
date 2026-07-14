import { useState, useEffect, useRef, useCallback } from 'react'

export function useWebSocket(channel: string, onMessage?: (data: any) => void) {
  const [connected, setConnected] = useState(false)
  const [messages, setMessages] = useState<any[]>([])
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectAttempts = useRef(0)
  const maxReconnectAttempts = 5
  const baseDelay = 1000

  const connect = useCallback(() => {
    const wsUrl = process.env.NEXT_PUBLIC_WEBSOCKET_URL
    if (!wsUrl) {
      console.warn("WebSocket URL not configured. Ensure NEXT_PUBLIC_WEBSOCKET_URL is set.")
      return
    }

    try {
      const socket = new WebSocket(`${wsUrl}/${channel}`)
      wsRef.current = socket

      socket.onopen = () => {
        setConnected(true)
        reconnectAttempts.current = 0
      }

      socket.onmessage = (event) => {
        if (event.data === "pong") return; // Ignore heartbeat responses

        try {
          const data = JSON.parse(event.data)
          setMessages((prev) => [...prev, data])
          if (onMessage) {
            onMessage(data)
          }
        } catch (e) {
          console.error('[WebSocket] Error parsing message:', e)
        }
      }

      socket.onerror = (e) => {
        console.error(`[WebSocket] Error in room ${channel}:`, e)
        setConnected(false)
      }

      socket.onclose = () => {
        setConnected(false)
        wsRef.current = null
        
        // Attempt reconnect with exponential backoff
        if (reconnectAttempts.current < maxReconnectAttempts) {
          const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30000)
          setTimeout(() => {
            reconnectAttempts.current += 1
            connect()
          }, delay)
        } else {
          console.error(`[WebSocket] Max reconnect attempts reached for ${channel}.`)
        }
      }
    } catch (err) {
      console.error('[WebSocket] Failed to initialize:', err)
    }
  }, [channel, onMessage])

  useEffect(() => {
    connect()

    // Heartbeat ping every 30 seconds to keep connection alive
    const pingInterval = setInterval(() => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send("ping")
      }
    }, 30000)

    return () => {
      clearInterval(pingInterval)
      if (wsRef.current) {
        wsRef.current.close()
      }
    }
  }, [connect])

  return { connected, messages }
}
