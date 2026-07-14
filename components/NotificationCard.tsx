import React from 'react'
import { X } from 'lucide-react'

interface NotificationCardProps {
  title: string
  message: string
  type?: 'info' | 'success' | 'warning' | 'error'
  timestamp?: string
  onDismiss?: () => void
}

export function NotificationCard({ title, message, type = 'info', timestamp, onDismiss }: NotificationCardProps) {
  const typeColors = {
    info: 'border-l-blue-500 bg-blue-50 dark:bg-blue-950',
    success: 'border-l-green-500 bg-green-50 dark:bg-green-950',
    warning: 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950',
    error: 'border-l-red-500 bg-red-50 dark:bg-red-950',
  }

  const typeTextColors = {
    info: 'text-blue-900 dark:text-blue-100',
    success: 'text-green-900 dark:text-green-100',
    warning: 'text-yellow-900 dark:text-yellow-100',
    error: 'text-red-900 dark:text-red-100',
  }

  return (
    <div className={`border-l-4 ${typeColors[type]} rounded p-4`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <h4 className={`text-sm font-bold ${typeTextColors[type]}`}>{title}</h4>
          <p className={`mt-1 text-sm ${typeTextColors[type]}`}>{message}</p>
          {timestamp && <p className="mt-1 text-xs opacity-75">{timestamp}</p>}
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-muted-foreground hover:text-foreground"
            aria-label="Dismiss notification"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}
