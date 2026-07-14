'use client'

import { Zap, AlertCircle } from 'lucide-react'

interface DigitalTwinCardProps {
  location: string
  status: 'operational' | 'degraded' | 'offline'
  capacity: number
  temperature?: number
  alerts?: number
}

export function DigitalTwinCard({
  location,
  status,
  capacity,
  temperature,
  alerts,
}: DigitalTwinCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'operational':
        return 'bg-green-50 border-green-200'
      case 'degraded':
        return 'bg-yellow-50 border-yellow-200'
      default:
        return 'bg-red-50 border-red-200'
    }
  }

  const getStatusBadgeColor = () => {
    switch (status) {
      case 'operational':
        return 'bg-green-100 text-green-800'
      case 'degraded':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-red-100 text-red-800'
    }
  }

  return (
    <div className={`rounded-lg border p-4 ${getStatusColor()}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-foreground">{location}</h3>
          <p className="text-xs text-muted-foreground">Real-time Digital Twin</p>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${getStatusBadgeColor()}`}>
          {status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-background rounded p-3">
          <p className="text-xs text-muted-foreground mb-1">Capacity</p>
          <p className="text-lg font-bold text-foreground">{capacity}%</p>
          <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary"
              style={{ width: `${capacity}%` }}
            />
          </div>
        </div>
        {temperature !== undefined && (
          <div className="bg-background rounded p-3">
            <p className="text-xs text-muted-foreground mb-1">Temperature</p>
            <p className="text-lg font-bold text-foreground">{temperature}°C</p>
          </div>
        )}
      </div>

      {alerts !== undefined && alerts > 0 && (
        <div className="flex items-center gap-2 p-2 bg-red-100 rounded text-red-800 text-xs font-medium">
          <AlertCircle className="h-4 w-4" />
          {alerts} active alerts
        </div>
      )}
    </div>
  )
}
