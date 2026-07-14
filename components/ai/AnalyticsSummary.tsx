'use client'

interface AnalyticsSummaryProps {
  title: string
  summary: string
  keyMetrics: Array<{ label: string; value: string | number }>
  insights: string[]
}

export function AnalyticsSummary({
  title,
  summary,
  keyMetrics,
  insights,
}: AnalyticsSummaryProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="font-semibold text-foreground mb-4">{title}</h3>
      
      <div className="mb-6 p-4 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground leading-relaxed">{summary}</p>
      </div>

      <div className="mb-6">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Key Metrics</h4>
        <div className="grid grid-cols-2 gap-3">
          {keyMetrics.map((metric) => (
            <div key={metric.label} className="p-3 bg-muted rounded">
              <p className="text-xs text-muted-foreground mb-1">{metric.label}</p>
              <p className="text-lg font-bold text-foreground">{metric.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Key Insights</h4>
        <ul className="space-y-2">
          {insights.map((insight, idx) => (
            <li key={idx} className="flex gap-2 text-sm text-muted-foreground">
              <span className="text-primary font-bold">•</span>
              <span>{insight}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
