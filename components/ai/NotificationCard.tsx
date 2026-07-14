'use client'

import { Bell, X } from 'lucide-react'
import { useState } from 'react'

interface NotificationCardProps {
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'critical'
  timestamp: string
  actionLabel?: string
  onAction?: () => void
  onDismiss?: () => void
}

export function NotificationCard({
  title,
  message,
  type,
  timestamp,
  actionLabel,
  onAction,
  onDismiss,
}: NotificationCardProps) {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  const getTypeColor = () => {
    switch (type) {
      case 'success':
        return 'border-green-200 bg-green-50'
      case 'warning':
        return 'border-yellow-200 bg-yellow-50'
      case 'critical':
        return 'border-red-200 bg-red-50'
      default:
        return 'border-blue-200 bg-blue-50'
    }
  }

  const getTypeBadgeColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-800'
      case 'warning':
        return 'bg-yellow-100 text-yellow-800'
      case 'critical':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-blue-100 text-blue-800'
    }
  }

  const getIconColor = () => {
    switch (type) {
      case 'success':
        return 'text-green-600'
      case 'warning':
        return 'text-yellow-600'
      case 'critical':
        return 'text-red-600'
      default:
        return 'text-blue-600'
    }
  }

  return (
    <div className={`rounded-lg border p-4 ${getTypeColor()}`}>
      <div className="flex items-start gap-3">
        <Bell className={`h-5 w-5 ${getIconColor()} flex-shrink-0 mt-0.5`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground">{title}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${getTypeBadgeColor()}`}>
              {type}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{message}</p>
          <p className="text-xs text-muted-foreground">{timestamp}</p>
        </div>
        <button
          onClick={() => {
            setDismissed(true)
            onDismiss?.()
          }}
          className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      {actionLabel && (
        <button
          onClick={onAction}
          className="mt-3 w-full px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
