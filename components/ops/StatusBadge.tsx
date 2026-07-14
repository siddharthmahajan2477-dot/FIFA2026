interface StatusBadgeProps {
  status: 'active' | 'idle' | 'offline' | 'critical' | 'pending' | 'resolved'
  label?: string
  size?: 'sm' | 'md' | 'lg'
}

export function StatusBadge({ status, label, size = 'md' } : StatusBadgeProps) {
  const statusConfig = {
    active: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-300', dot: 'bg-green-500' },
    idle: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300', dot: 'bg-blue-500' },
    offline: { bg: 'bg-gray-100 dark:bg-gray-900/30', text: 'text-gray-700 dark:text-gray-300', dot: 'bg-gray-500' },
    critical: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-300', dot: 'bg-red-500' },
    pending: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-300', dot: 'bg-yellow-500' },
    resolved: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-300', dot: 'bg-purple-500' },
  }

  const config = statusConfig[status]

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  }

  const dotSizes = {
    sm: 'h-1.5 w-1.5',
    md: 'h-2 w-2',
    lg: 'h-2.5 w-2.5',
  }

  const displayLabel = label || status.charAt(0).toUpperCase() + status.slice(1)

  return (
    <span className={`inline-flex items-center gap-2 rounded-full font-medium ${config.bg} ${config.text} ${sizeClasses[size]}`}>
      <span className={`rounded-full ${config.dot} ${dotSizes[size]} animate-pulse`} />
      {displayLabel}
    </span>
  )
}
