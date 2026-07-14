import { LucideIcon } from 'lucide-react'
import Link from 'next/link'

interface EnhancedEmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    href?: string
    onClick?: () => void
  }
  secondaryAction?: {
    label: string
    href?: string
    onClick?: () => void
  }
}

export function EnhancedEmptyState({
  icon: Icon,
  title,
  description,
  action,
  secondaryAction,
}: EnhancedEmptyStateProps) {
  return (
    <div className="flex min-h-96 flex-col items-center justify-center rounded-lg border border-border bg-card p-8 text-center text-card-foreground">
      <div className="mb-6 inline-flex rounded-full bg-primary/10 p-4">
        <Icon className="h-8 w-8 text-primary" />
      </div>
      
      <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mb-6 max-w-sm text-muted-foreground">{description}</p>
      
      <div className="flex flex-wrap gap-3 justify-center">
        {action && action.href ? (
          <Link
            href={action.href}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2 font-semibold text-primary-foreground transition-all hover:bg-primary/90"
          >
            {action.label}
          </Link>
        ) : action && action.onClick ? (
          <button
            onClick={action.onClick}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2 font-semibold text-primary-foreground transition-all hover:bg-primary/90"
          >
            {action.label}
          </button>
        ) : null}
        
        {secondaryAction && secondaryAction.href ? (
          <Link
            href={secondaryAction.href}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-2 font-semibold text-foreground transition-all hover:bg-muted"
          >
            {secondaryAction.label}
          </Link>
        ) : secondaryAction && secondaryAction.onClick ? (
          <button
            onClick={secondaryAction.onClick}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-2 font-semibold text-foreground transition-all hover:bg-muted"
          >
            {secondaryAction.label}
          </button>
        ) : null}
      </div>
    </div>
  )
}
