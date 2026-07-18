'use client'

import { TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface KPIWidgetProps {
  title: string
  value: number | string
  unit?: string
  change?: number
  trend?: 'up' | 'down' | 'stable'
  icon?: React.ReactNode
  target?: number | string
}

export function KPIWidget({ title, value, unit, change, trend, icon, target }: KPIWidgetProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          {icon && <div className="h-4 w-4 text-muted-foreground opacity-50">{icon}</div>}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">{value}</span>
            {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
          </div>
          {change !== undefined && trend && (
            <div className="flex items-center gap-1">
              {trend === 'stable' ? (
                <span className="text-sm text-muted-foreground">{change}%</span>
              ) : trend === 'up' ? (
                <>
                  <TrendingUp className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm text-emerald-600">+{change}%</span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-red-600">{change}%</span>
                </>
              )}
            </div>
          )}
          {target && (
            <p className="text-xs text-muted-foreground">Target: {target}</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
