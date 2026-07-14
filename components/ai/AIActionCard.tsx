'use client'

import { Zap, CheckCircle2 } from 'lucide-react'

interface AIActionCardProps {
  action: string
  description: string
  expectedOutcome: string
  automatable: boolean
  onExecute?: () => void
}

export function AIActionCard({
  action,
  description,
  expectedOutcome,
  automatable,
  onExecute,
}: AIActionCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 hover:shadow-md transition-all">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3">
          <Zap className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <h3 className="font-semibold text-foreground">{action}</h3>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
        </div>
      </div>

      <div className="mb-4 p-3 bg-muted rounded text-sm">
        <p className="text-muted-foreground">
          <span className="font-semibold text-foreground">Expected Outcome: </span>
          {expectedOutcome}
        </p>
      </div>

      <div className="flex items-center justify-between">
        {automatable && (
          <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
            <CheckCircle2 className="h-4 w-4" />
            Can be automated
          </div>
        )}
        <button
          onClick={onExecute}
          className="ml-auto px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all"
        >
          Execute
        </button>
      </div>
    </div>
  )
}
