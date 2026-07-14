'use client'

interface StatusIndicatorProps {
  status: 'operational' | 'warning' | 'critical' | 'offline'
  label?: string
  animated?: boolean
}

export function StatusIndicator({ status, label, animated = true }: StatusIndicatorProps) {
  const colors = {
    operational: 'bg-emerald-500 dark:bg-emerald-400',
    warning: 'bg-amber-500 dark:bg-amber-400',
    critical: 'bg-red-500 dark:bg-red-400',
    offline: 'bg-gray-500 dark:bg-gray-400',
  }

  const labels = {
    operational: 'Operational',
    warning: 'Warning',
    critical: 'Critical',
    offline: 'Offline',
  }

  return (
    <div className="flex items-center gap-2">
      <div className="relative w-3 h-3">
        <div
          className={`w-3 h-3 rounded-full ${colors[status]} ${
            animated && status !== 'offline' ? 'animate-pulse' : ''
          }`}
        />
      </div>
      {label ? (
        <span className="text-sm text-muted-foreground">{label}</span>
      ) : (
        <span className="text-sm text-muted-foreground">{labels[status]}</span>
      )}
    </div>
  )
}
