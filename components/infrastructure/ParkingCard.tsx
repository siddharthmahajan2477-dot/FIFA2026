'use client'

import { ArrowUpRight, ArrowDownRight, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface ParkingCardProps {
  type: 'standard' | 'vip' | 'accessible' | 'charging'
  available: number
  occupied: number
  capacity: number
  status?: 'available' | 'limited' | 'full'
}

export function ParkingCard({ type, available, occupied, capacity, status }: ParkingCardProps) {
  const occupancyRate = (occupied / capacity) * 100
  const typeLabel = {
    standard: 'Standard Parking',
    vip: 'VIP Parking',
    accessible: 'Accessible Parking',
    charging: 'Electric Charging',
  }[type]

  const statusColor = {
    available: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    limited: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    full: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  }[status || 'available']

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{typeLabel}</CardTitle>
          <Badge className={statusColor}>
            {status === 'full' ? 'Full' : status === 'limited' ? 'Limited' : 'Available'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Available</p>
            <p className="text-2xl font-bold text-emerald-600">{available}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Occupied</p>
            <p className="text-2xl font-bold text-amber-600">{occupied}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Capacity</p>
            <p className="text-2xl font-bold text-foreground">{capacity}</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-red-500 transition-all"
              style={{ width: `${occupancyRate}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground text-right">
            {Math.round(occupancyRate)}% occupied
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
