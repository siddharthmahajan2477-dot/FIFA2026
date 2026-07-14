import { ReactNode } from 'react'

interface SectionLayoutProps {
  title: string
  subtitle?: string
  children: ReactNode
  action?: ReactNode
  variant?: 'default' | 'card' | 'minimal'
}

export function SectionLayout({
  title,
  subtitle,
  children,
  action,
  variant = 'default',
}: SectionLayoutProps) {
  const containerClass =
    variant === 'card'
      ? 'rounded-lg border border-border bg-card p-6'
      : variant === 'minimal'
        ? ''
        : 'space-y-4'

  const headerClass =
    variant === 'minimal'
      ? 'space-y-2'
      : 'flex items-start justify-between gap-4'

  return (
    <div className={containerClass}>
      <div className={headerClass}>
        <div>
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
      <div>{children}</div>
    </div>
  )
}
