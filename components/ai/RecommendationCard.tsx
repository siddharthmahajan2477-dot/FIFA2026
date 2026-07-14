'use client'

import { CheckCircle, AlertCircle, ChevronRight } from 'lucide-react'

interface RecommendationCardProps {
  title: string
  description: string
  action: string
  priority: 'high' | 'medium' | 'low'
  implemented?: boolean
  onClick?: () => void
}

export function RecommendationCard({
  title,
  description,
  action,
  priority,
  implemented,
  onClick,
}: RecommendationCardProps) {
  const getPriorityColor = () => {
    switch (priority) {
      case 'high':
        return 'border-red-200 bg-red-50'
      case 'medium':
        return 'border-yellow-200 bg-yellow-50'
      default:
        return 'border-green-200 bg-green-50'
    }
  }

  const getPriorityBadgeColor = () => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-green-100 text-green-800'
    }
  }

  return (
    <div
      className={`rounded-lg border p-4 ${getPriorityColor()} ${onClick ? 'cursor-pointer hover:shadow-md transition-all' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {implemented ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <AlertCircle className="h-5 w-5 text-orange-600" />
            )}
            <h3 className="font-semibold text-foreground">{title}</h3>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityBadgeColor()}`}>
              {priority}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{description}</p>
          <button className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
            {action}
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
