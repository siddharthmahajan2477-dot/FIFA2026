'use client'

interface ForecastChartProps {
  title: string
  data: Array<{
    time: string
    actual: number
    forecast: number
    confidence: number
  }>
}

export function ForecastChart({ title, data }: ForecastChartProps) {
  const maxValue = Math.max(...data.flatMap((d) => [d.actual, d.forecast]))
  const scale = 100 / maxValue

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="font-semibold text-foreground mb-6">{title}</h3>
      <div className="space-y-4">
        {data.map((item, idx) => (
          <div key={idx}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">{item.time}</span>
              <span className="text-xs text-muted-foreground">{item.confidence}% confidence</span>
            </div>
            <div className="flex items-end gap-2">
              <div className="flex-1 bg-muted rounded h-6 overflow-hidden">
                <div
                  className="bg-blue-500 h-full transition-all"
                  style={{ width: `${item.actual * scale}%` }}
                />
              </div>
              <div className="flex-1 bg-muted rounded h-6 overflow-hidden opacity-60">
                <div
                  className="bg-purple-500 h-full transition-all"
                  style={{ width: `${item.forecast * scale}%` }}
                />
              </div>
            </div>
            <div className="flex gap-6 mt-1 text-xs">
              <span>
                <span className="text-muted-foreground">Actual: </span>
                <span className="font-semibold text-blue-600">{item.actual}</span>
              </span>
              <span>
                <span className="text-muted-foreground">Forecast: </span>
                <span className="font-semibold text-purple-600">{item.forecast}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
