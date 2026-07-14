'use client'

import { AlertCircle, RotateCcw } from 'lucide-react'

interface ErrorStateProps {
  title?: string
  message: string
  onRetry?: () => void
}

export function ErrorState({
  title = 'Something went wrong',
  message,
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-destructive/20 bg-destructive/5 p-8">
      <div className="max-w-md space-y-4 text-center">
        <div className="flex justify-center">
          <div className="rounded-lg bg-destructive/10 p-3">
            <AlertCircle className="h-6 w-6 text-destructive" />
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-destructive">{title}</h3>
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 rounded-lg bg-destructive/10 px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/20"
          >
            <RotateCcw className="h-4 w-4" />
            Try again
          </button>
        )}
      </div>
    </div>
  )
}
