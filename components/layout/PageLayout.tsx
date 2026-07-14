import { ReactNode } from 'react'

interface PageLayoutProps {
  title?: string
  subtitle?: string
  children: ReactNode
  action?: ReactNode
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  full: 'max-w-full',
}

const paddingClasses = {
  none: 'p-0',
  sm: 'p-4 sm:p-6',
  md: 'p-6 sm:p-8',
  lg: 'p-8 sm:p-12',
}

export function PageLayout({
  title,
  subtitle,
  children,
  action,
  maxWidth = 'xl',
  padding = 'md',
}: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {title && (
        <div className={`border-b border-border bg-card ${paddingClasses[padding]}`}>
          <div className={`mx-auto ${maxWidthClasses[maxWidth]}`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">{title}</h1>
                {subtitle && (
                  <p className="mt-1 text-muted-foreground">{subtitle}</p>
                )}
              </div>
              {action && <div className="flex-shrink-0">{action}</div>}
            </div>
          </div>
        </div>
      )}
      <div className={paddingClasses[padding]}>
        <div className={`mx-auto ${maxWidthClasses[maxWidth]}`}>{children}</div>
      </div>
    </div>
  )
}
