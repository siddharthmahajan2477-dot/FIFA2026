import { useState, useEffect } from 'react'
import { NotificationService } from '../services/notification.service'
import { Notification } from '../types/notification'

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const list = await NotificationService.getNotifications()
        setNotifications(list)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }
    fetchNotifications()
  }, [])

  const dismiss = async (id: string | number) => {
    try {
      await NotificationService.markAsRead(id.toString())
      setNotifications((prev) => prev.filter((n) => n.id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  const clearAll = async () => {
    try {
      await NotificationService.clearAll()
      setNotifications([])
    } catch (err) {
      console.error(err)
    }
  }

  return { notifications, loading, error, dismiss, clearAll }
}
