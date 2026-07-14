'use client'

import { Lightbulb, TrendingUp, TrendingDown } from 'lucide-react'

interface InsightCardProps {
  title: string
  insight: string
  impact: 'positive' | 'negative' | 'neutral'
  confidence: number
  icon?: React.ReactNode
}

export function InsightCard({
  title,
  insight,
  impact,
  confidence,
  icon,
}: InsightCardProps) {
  const getImpactColor = () => {
    switch (impact) {
      case 'positive':
        return 'border-green-200 bg-green-50'
      case 'negative':
        return 'border-red-200 bg-red-50'
      default:
        return 'border-blue-200 bg-blue-50'
    }
  }

  const getImpactIcon = () => {
    switch (impact) {
      case 'positive':
        return <TrendingUp className="h-5 w-5 text-green-600" />
      case 'negative':
        return <TrendingDown className="h-5 w-5 text-red-600" />
      default:
        return <Lightbulb className="h-5 w-5 text-blue-600" />
    }
  }

  return (
    <div className={`rounded-lg border p-4 ${getImpactColor()}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {icon || getImpactIcon()}
            <h3 className="font-semibold text-foreground">{title}</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{insight}</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-background rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  impact === 'positive'
                    ? 'bg-green-600'
                    : impact === 'negative'
                      ? 'bg-red-600'
                      : 'bg-blue-600'
                }`}
                style={{ width: `${confidence}%` }}
              />
            </div>
            <span className="text-xs font-medium">{confidence}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
