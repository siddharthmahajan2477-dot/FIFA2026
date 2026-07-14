'use client'

import { InboxIcon, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface EmptyStateProps {
  icon?: React.ComponentType<{ className?: string }>
  title: string
  description?: string
  action?: {
    label: string
    href?: string
    onClick?: () => void
  }
}

export function EmptyState({
  icon: Icon = InboxIcon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-border bg-card/50 p-8 text-center">
      <div className="max-w-md space-y-4">
        <div className="flex justify-center">
          <div className="rounded-lg bg-muted p-3">
            <Icon className="h-6 w-6 text-muted-foreground" />
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-foreground">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {action && (
          <div className="pt-2">
            {action.href ? (
              <Link
                href={action.href}
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                {action.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <button
                onClick={action.onClick}
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                {action.label}
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
