'use client'

import { Sparkles, TrendingUp } from 'lucide-react'

interface PredictionCardProps {
  metric: string
  currentValue: string | number
  predictedValue: string | number
  timeframe: string
  confidence: number
  direction: 'up' | 'down' | 'stable'
}

export function PredictionCard({
  metric,
  currentValue,
  predictedValue,
  timeframe,
  confidence,
  direction,
}: PredictionCardProps) {
  const getDirectionColor = () => {
    switch (direction) {
      case 'up':
        return 'text-green-600'
      case 'down':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">{metric}</h3>
        </div>
        <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 font-medium">
          {confidence}% confident
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Current</p>
          <p className="text-lg font-bold text-foreground">{currentValue}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Predicted ({timeframe})</p>
          <div className="flex items-center gap-2">
            <p className="text-lg font-bold text-foreground">{predictedValue}</p>
            <TrendingUp className={`h-5 w-5 ${getDirectionColor()}`} />
          </div>
        </div>
      </div>

      <div className="text-xs text-muted-foreground">
        Based on historical data and current trends
      </div>
    </div>
  )
}
