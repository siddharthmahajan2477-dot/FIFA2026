'use client'

import { CheckCircle, AlertCircle } from 'lucide-react'

interface ConfidenceBadgeProps {
  confidence: number
  label?: string
}

export function ConfidenceBadge({ confidence, label = 'Confidence' }: ConfidenceBadgeProps) {
  const isHighConfidence = confidence >= 80
  const isMediumConfidence = confidence >= 60

  const getColor = () => {
    if (isHighConfidence) return 'bg-green-100 text-green-800'
    if (isMediumConfidence) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  const getIcon = () => {
    if (isHighConfidence) return <CheckCircle className="h-3.5 w-3.5" />
    if (isMediumConfidence) return <AlertCircle className="h-3.5 w-3.5" />
    return <AlertCircle className="h-3.5 w-3.5" />
  }

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${getColor()}`}>
      {getIcon()}
      <span>{label}</span>
      <span className="font-bold">{confidence}%</span>
    </div>
  )
}
