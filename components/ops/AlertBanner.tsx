'use client'

import { AlertCircle, AlertTriangle, Info, CheckCircle, X } from 'lucide-react'
import { useState } from 'react'

interface AlertBannerProps {
  type: 'info' | 'warning' | 'critical' | 'success'
  title: string
  message: string
  dismissible?: boolean
  onDismiss?: () => void
}

export function AlertBanner({
  type,
  title,
  message,
  dismissible = true,
  onDismiss,
}: AlertBannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  const handleDismiss = () => {
    setIsVisible(false)
    onDismiss?.()
  }

  const typeConfig = {
    info: {
      icon: Info,
      bgColor: 'bg-blue-50 dark:bg-blue-950/30',
      borderColor: 'border-blue-200 dark:border-blue-800',
      titleColor: 'text-blue-900 dark:text-blue-200',
      messageColor: 'text-blue-800 dark:text-blue-300',
    },
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-yellow-50 dark:bg-yellow-950/30',
      borderColor: 'border-yellow-200 dark:border-yellow-800',
      titleColor: 'text-yellow-900 dark:text-yellow-200',
      messageColor: 'text-yellow-800 dark:text-yellow-300',
    },
    critical: {
      icon: AlertCircle,
      bgColor: 'bg-red-50 dark:bg-red-950/30',
      borderColor: 'border-red-200 dark:border-red-800',
      titleColor: 'text-red-900 dark:text-red-200',
      messageColor: 'text-red-800 dark:text-red-300',
    },
    success: {
      icon: CheckCircle,
      bgColor: 'bg-green-50 dark:bg-green-950/30',
      borderColor: 'border-green-200 dark:border-green-800',
      titleColor: 'text-green-900 dark:text-green-200',
      messageColor: 'text-green-800 dark:text-green-300',
    },
  }

  const config = typeConfig[type]
  const Icon = config.icon

  return (
    <div className={`rounded-lg border ${config.bgColor} ${config.borderColor} p-4`}>
      <div className="flex gap-3">
        <Icon className={`h-5 w-5 flex-shrink-0 ${config.titleColor}`} />
        <div className="flex-1">
          <h3 className={`font-semibold ${config.titleColor}`}>{title}</h3>
          <p className={`mt-1 text-sm ${config.messageColor}`}>{message}</p>
        </div>
        {dismissible && (
          <button
            onClick={handleDismiss}
            className={`ml-2 flex-shrink-0 text-muted-foreground transition-colors hover:text-foreground`}
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  )
}
