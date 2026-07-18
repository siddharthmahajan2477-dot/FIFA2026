'use client'

import { TrendingUp, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface EnergyCardProps {
  type: 'usage' | 'solar' | 'battery' | 'generator'
  value: number
  unit: string
  max?: number
  trend?: number
  status?: 'normal' | 'warning' | 'critical' | 'closed'
}

export function EnergyCard({ type, value, unit, max, trend, status }: EnergyCardProps) {
  const typeLabel = {
    usage: 'Current Usage',
    solar: 'Solar Generation',
    battery: 'Battery Level',
    generator: 'Generator Status',
  }[type]

  const statusColor = {
    normal: 'text-emerald-600 dark:text-emerald-400',
    warning: 'text-amber-600 dark:text-amber-400',
    critical: 'text-red-600 dark:text-red-400',
    closed: 'text-slate-600 dark:text-slate-400',
  }[status || 'normal']

  const percentage = max ? (value / max) * 100 : 0

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{typeLabel}</CardTitle>
          <Zap className={`h-5 w-5 ${statusColor}`} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-4xl font-bold">{value}</p>
          <p className="text-sm text-muted-foreground">{unit}</p>
        </div>
        {max && (
          <div className="space-y-2">
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round(percentage)}% of {max} {unit}
            </p>
          </div>
        )}
        {trend !== undefined && (
          <div className="flex items-center gap-1 text-sm">
            <TrendingUp className="h-4 w-4 text-emerald-600" />
            <span className="text-emerald-600">+{trend}% today</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
