'use client'

import { FileText, BarChart3, AlertCircle, User } from 'lucide-react'

interface SearchResultCardProps {
  title: string
  type: 'document' | 'report' | 'alert' | 'profile'
  excerpt: string
  relevance: number
  tags?: string[]
  onClick?: () => void
}

export function SearchResultCard({
  title,
  type,
  excerpt,
  relevance,
  tags,
  onClick,
}: SearchResultCardProps) {
  const getTypeIcon = () => {
    switch (type) {
      case 'report':
        return <BarChart3 className="h-5 w-5 text-blue-600" />
      case 'alert':
        return <AlertCircle className="h-5 w-5 text-red-600" />
      case 'profile':
        return <User className="h-5 w-5 text-purple-600" />
      default:
        return <FileText className="h-5 w-5 text-gray-600" />
    }
  }

  const getTypeBg = () => {
    switch (type) {
      case 'report':
        return 'bg-blue-50'
      case 'alert':
        return 'bg-red-50'
      case 'profile':
        return 'bg-purple-50'
      default:
        return 'bg-gray-50'
    }
  }

  return (
    <div
      onClick={onClick}
      className={`rounded-lg border border-border p-4 hover:shadow-md transition-all cursor-pointer ${getTypeBg()}`}
    >
      <div className="flex items-start gap-3 mb-3">
        {getTypeIcon()}
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{title}</h3>
          <p className="text-xs text-muted-foreground capitalize mt-0.5">{type}</p>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{excerpt}</p>

      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-1">
          {tags?.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-full bg-background text-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1 w-12 bg-background rounded-full overflow-hidden">
            <div
              className="h-full bg-primary"
              style={{ width: `${relevance}%` }}
            />
          </div>
          <span className="text-xs font-semibold text-foreground">{relevance}%</span>
        </div>
      </div>
    </div>
  )
}
