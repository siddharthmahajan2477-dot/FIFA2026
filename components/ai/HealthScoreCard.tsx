'use client'

import { Activity } from 'lucide-react'

interface HealthScoreCardProps {
  title: string
  score: number
  status: 'excellent' | 'good' | 'fair' | 'poor'
  metrics: Array<{ label: string; value: number }>
}

export function HealthScoreCard({ title, score, status, metrics }: HealthScoreCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'excellent':
        return 'text-green-600'
      case 'good':
        return 'text-blue-600'
      case 'fair':
        return 'text-yellow-600'
      default:
        return 'text-red-600'
    }
  }

  const getStatusBg = () => {
    switch (status) {
      case 'excellent':
        return 'bg-green-50'
      case 'good':
        return 'bg-blue-50'
      case 'fair':
        return 'bg-yellow-50'
      default:
        return 'bg-red-50'
    }
  }

  return (
    <div className={`rounded-lg border border-border p-6 ${getStatusBg()}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">{title}</h3>
        <Activity className={`h-5 w-5 ${getStatusColor()}`} />
      </div>

      <div className="mb-6">
        <div className="flex items-end gap-2 mb-2">
          <span className={`text-4xl font-bold ${getStatusColor()}`}>{score}</span>
          <span className="text-sm font-medium text-muted-foreground">/100</span>
        </div>
        <p className="text-sm text-muted-foreground capitalize">{status}</p>
      </div>

      <div className="space-y-2">
        {metrics.map((metric) => (
          <div key={metric.label} className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{metric.label}</span>
            <div className="flex-1 mx-2 h-1 bg-background rounded-full overflow-hidden">
              <div
                className={`h-full ${getStatusColor().replace('text-', 'bg-')}`}
                style={{ width: `${metric.value}%` }}
              />
            </div>
            <span className="text-xs font-medium text-foreground w-8 text-right">
              {metric.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
