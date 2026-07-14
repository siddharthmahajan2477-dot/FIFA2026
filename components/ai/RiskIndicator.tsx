'use client'

import { AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react'

interface RiskIndicatorProps {
  category: string
  riskLevel: 'critical' | 'high' | 'medium' | 'low'
  probability: number
  impact: number
  description: string
}

export function RiskIndicator({
  category,
  riskLevel,
  probability,
  impact,
  description,
}: RiskIndicatorProps) {
  const getRiskColor = () => {
    switch (riskLevel) {
      case 'critical':
        return 'border-red-300 bg-red-50'
      case 'high':
        return 'border-orange-300 bg-orange-50'
      case 'medium':
        return 'border-yellow-300 bg-yellow-50'
      default:
        return 'border-green-300 bg-green-50'
    }
  }

  const getRiskIcon = () => {
    switch (riskLevel) {
      case 'critical':
        return <AlertTriangle className="h-5 w-5 text-red-600" />
      case 'high':
        return <AlertCircle className="h-5 w-5 text-orange-600" />
      case 'medium':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />
      default:
        return <CheckCircle className="h-5 w-5 text-green-600" />
    }
  }

  const getRiskBadgeColor = () => {
    switch (riskLevel) {
      case 'critical':
        return 'bg-red-100 text-red-800'
      case 'high':
        return 'bg-orange-100 text-orange-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-green-100 text-green-800'
    }
  }

  return (
    <div className={`rounded-lg border p-4 ${getRiskColor()}`}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          {getRiskIcon()}
          <h3 className="font-semibold text-foreground">{category}</h3>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${getRiskBadgeColor()}`}>
          {riskLevel}
        </span>
      </div>
      <p className="text-sm text-muted-foreground mb-3">{description}</p>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Probability</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-background rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-500"
                style={{ width: `${probability}%` }}
              />
            </div>
            <span className="text-xs font-semibold">{probability}%</span>
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Impact</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-background rounded-full overflow-hidden">
              <div
                className="h-full bg-red-500"
                style={{ width: `${impact}%` }}
              />
            </div>
            <span className="text-xs font-semibold">{impact}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
