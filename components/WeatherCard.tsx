import React from 'react'
import { Cloud, Droplets, Wind } from 'lucide-react'

interface WeatherCardProps {
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
  location?: string
}

export function WeatherCard({ temperature, condition, humidity, windSpeed, location }: WeatherCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 text-card-foreground">
      <p className="mb-3 text-xs font-semibold uppercase text-muted-foreground">Stadium Weather</p>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-4xl font-bold text-primary">{temperature}°</p>
          <p className="mt-1 text-sm text-foreground">{condition}</p>
          {location && <p className="text-xs text-muted-foreground">{location}</p>}
        </div>
        <div className="text-primary">
          <Cloud className="h-12 w-12" />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="flex items-center gap-2 rounded bg-muted p-2">
          <Droplets className="h-4 w-4 text-muted-foreground" />
          <div className="text-xs">
            <p className="text-muted-foreground">Humidity</p>
            <p className="font-bold text-foreground">{humidity}%</p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded bg-muted p-2">
          <Wind className="h-4 w-4 text-muted-foreground" />
          <div className="text-xs">
            <p className="text-muted-foreground">Wind</p>
            <p className="font-bold text-foreground">{windSpeed} km/h</p>
          </div>
        </div>
      </div>
    </div>
  )
}
