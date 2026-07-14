export interface Notification {
  id: string | number
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'critical' | 'emergency' | 'match' | 'ticket' | 'weather' | 'food' | 'transport' | 'merchandise' | 'system'
  timestamp: string | Date
  unread?: boolean
}
