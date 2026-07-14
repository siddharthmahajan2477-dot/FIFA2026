import React from 'react'
import { MapPin, Clock, AlertTriangle } from 'lucide-react'

interface TransportCardProps {
  mode: 'bus' | 'train' | 'metro' | 'parking'
  status: 'on-time' | 'delayed' | 'delayed-significantly'
  nextArrival?: string
  delay?: number
  location?: string
  capacity?: number
}

export function TransportCard({ mode, status, nextArrival, delay, location, capacity }: TransportCardProps) {
  const modeLabels = {
    bus: 'Bus',
    train: 'Train',
    metro: 'Metro',
    parking: 'Parking',
  }

  const statusColors = {
    'on-time': 'text-green-600 dark:text-green-400',
    delayed: 'text-yellow-600 dark:text-yellow-400',
    'delayed-significantly': 'text-red-600 dark:text-red-400',
  }

  return (
    <div className="rounded-lg border border-border bg-card p-4 text-card-foreground">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-bold text-foreground">{modeLabels[mode]}</p>
          <div className="mt-2 flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <p className={`text-sm font-semibold ${statusColors[status]}`}>{nextArrival || 'No data'}</p>
          </div>
          {delay && delay > 0 && <p className="mt-1 text-xs text-red-600 dark:text-red-400">+{delay} min delay</p>}
          {location && (
            <div className="mt-2 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">{location}</p>
            </div>
          )}
        </div>
        {status === 'delayed-significantly' && <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />}
      </div>
      {capacity !== undefined && (
        <div className="mt-3 flex items-center gap-2">
          <div className="flex-1 rounded-full bg-muted">
            <div className="rounded-full bg-primary py-1" style={{ width: `${Math.min(capacity, 100)}%` }} />
          </div>
          <span className="text-xs font-semibold text-muted-foreground">{capacity}%</span>
        </div>
      )}
    </div>
  )
}
