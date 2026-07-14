import React from 'react'
import { Clock } from 'lucide-react'

interface NewsCardProps {
  title: string
  summary: string
  timestamp: string
  category?: string
  image?: string
  onClick?: () => void
}

export function NewsCard({ title, summary, timestamp, category, image, onClick }: NewsCardProps) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer overflow-hidden rounded-lg border border-border bg-card text-card-foreground transition-all hover:border-primary hover:shadow-md"
    >
      {image && (
        <div className="h-32 w-full overflow-hidden bg-muted">
          <img src={image} alt={title} className="h-full w-full object-cover" />
        </div>
      )}
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          {category && <span className="text-xs font-semibold uppercase text-primary">{category}</span>}
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {timestamp}
          </div>
        </div>
        <h3 className="mb-2 line-clamp-2 text-sm font-bold text-foreground">{title}</h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{summary}</p>
      </div>
    </div>
  )
}
