'use client'

import { Droplets, AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface WaterCardProps {
  type: 'consumption' | 'storage' | 'quality' | 'leaks'
  value: number
  unit: string
  max?: number
  alert?: boolean
}

export function WaterCard({ type, value, unit, max, alert }: WaterCardProps) {
  const typeLabel = {
    consumption: 'Water Consumption',
    storage: 'Storage Tanks',
    quality: 'Water Quality',
    leaks: 'Leak Detection',
  }[type]

  const percentage = max ? (value / max) * 100 : 0

  return (
    <Card className={alert ? 'border-red-200 dark:border-red-900' : ''}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{typeLabel}</CardTitle>
          {alert && <AlertTriangle className="h-5 w-5 text-red-600" />}
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
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round(percentage)}% capacity
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
