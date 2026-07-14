import { ArrowUp, ArrowDown, ArrowRight } from 'lucide-react'

interface KPICardProps {
  title: string
  value: string | number
  unit?: string
  trend?: 'up' | 'down' | 'stable'
  trendPercent?: number
  icon?: React.ReactNode
  status?: 'normal' | 'warning' | 'critical'
  onClick?: () => void
}

export function KPICard({
  title,
  value,
  unit,
  trend,
  trendPercent,
  icon,
  status = 'normal',
  onClick,
}: KPICardProps) {
  const statusColors = {
    normal: 'border-border bg-card',
    warning: 'border-yellow-500/50 bg-yellow-50 dark:bg-yellow-950/30',
    critical: 'border-red-500/50 bg-red-50 dark:bg-red-950/30',
  }

  const trendIcons = {
    up: <ArrowUp className="h-4 w-4 text-green-500" />,
    down: <ArrowDown className="h-4 w-4 text-red-500" />,
    stable: <ArrowRight className="h-4 w-4 text-gray-500" />,
  }

  return (
    <div
      onClick={onClick}
      className={`rounded-lg border p-6 transition-all ${statusColors[status]} ${
        onClick ? 'cursor-pointer hover:shadow-md' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-foreground">{value}</span>
            {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
          </div>
          {trend && trendPercent !== undefined && (
            <div className="mt-2 flex items-center gap-1">
              {trendIcons[trend]}
              <span className={`text-xs font-medium ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
                {Math.abs(trendPercent)}% {trend === 'up' ? 'increase' : trend === 'down' ? 'decrease' : 'no change'}
              </span>
            </div>
          )}
        </div>
        {icon && <div className="ml-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">{icon}</div>}
      </div>
    </div>
  )
}
