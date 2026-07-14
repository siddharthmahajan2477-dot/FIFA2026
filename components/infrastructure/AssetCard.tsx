'use client'

import { Package, AlertCircle, CheckCircle2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface AssetCardProps {
  name: string
  type: string
  status: 'operational' | 'maintenance' | 'offline'
  lastMaintenance: string
  nextMaintenance: string
}

export function AssetCard({ name, type, status, lastMaintenance, nextMaintenance }: AssetCardProps) {
  const statusColor = {
    operational: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    maintenance: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    offline: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  }[status]

  const statusIcon = {
    operational: <CheckCircle2 className="h-4 w-4" />,
    maintenance: <AlertCircle className="h-4 w-4" />,
    offline: <AlertCircle className="h-4 w-4" />,
  }[status]

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base">{name}</CardTitle>
            <p className="text-sm text-muted-foreground">{type}</p>
          </div>
          <Badge className={statusColor}>
            {status === 'operational' ? 'Operational' : status === 'maintenance' ? 'In Service' : 'Offline'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-muted-foreground">Last Service</p>
            <p className="font-medium">{lastMaintenance}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Next Service</p>
            <p className="font-medium">{nextMaintenance}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
