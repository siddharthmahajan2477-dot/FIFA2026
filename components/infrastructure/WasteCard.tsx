'use client'

import { Trash2, Leaf } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface WasteCardProps {
  type: 'collection' | 'recycling' | 'organic' | 'plastic'
  collected: number
  percentage: number
  status: 'active' | 'pending' | 'completed'
}

export function WasteCard({ type, collected, percentage, status }: WasteCardProps) {
  const typeLabel = {
    collection: 'General Waste',
    recycling: 'Recycling',
    organic: 'Organic Waste',
    plastic: 'Plastic Waste',
  }[type]

  const statusColor = {
    active: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    completed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  }[status]

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{typeLabel}</CardTitle>
          <Badge className={statusColor}>
            {status === 'active' ? 'Active' : status === 'pending' ? 'Pending' : 'Completed'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-4xl font-bold text-emerald-600">{collected}</p>
            <p className="text-sm text-muted-foreground">Items Collected</p>
          </div>
          <Leaf className="h-8 w-8 text-emerald-500 opacity-50" />
        </div>
        <div className="space-y-2">
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground text-right">
            {percentage}% collected
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
