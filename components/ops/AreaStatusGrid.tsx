interface AreaStatus {
  id: string
  name: string
  capacity: number
  current: number
  status: 'normal' | 'warning' | 'critical'
  incidents?: number
}

interface AreaStatusGridProps {
  areas: AreaStatus[]
  onSelectArea?: (area: AreaStatus) => void
}

export function AreaStatusGrid({ areas, onSelectArea }: AreaStatusGridProps) {
  const getCapacityColor = (current: number, capacity: number) => {
    const percentage = (current / capacity) * 100
    if (percentage >= 90) return 'bg-red-500'
    if (percentage >= 70) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'critical':
        return 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800'
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800'
      default:
        return 'bg-card border-border'
    }
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {areas.map((area) => {
        const capacityPercent = Math.round((area.current / area.capacity) * 100)
        return (
          <div
            key={area.id}
            onClick={() => onSelectArea?.(area)}
            className={`rounded-lg border p-4 transition-all ${getStatusBg(area.status)} ${
              onSelectArea ? 'cursor-pointer hover:shadow-md' : ''
            }`}
          >
            <h3 className="mb-2 font-semibold text-foreground">{area.name}</h3>

            <div className="mb-3 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Occupancy</span>
                <span className="font-medium text-foreground">
                  {area.current} / {area.capacity}
                </span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full transition-all ${getCapacityColor(area.current, area.capacity)}`}
                  style={{ width: `${Math.min(capacityPercent, 100)}%` }}
                />
              </div>
              <div className="text-xs text-muted-foreground">{capacityPercent}% full</div>
            </div>

            {area.incidents ? (
              <div className="rounded-md bg-red-100 dark:bg-red-900/30 px-2 py-1 text-xs font-medium text-red-700 dark:text-red-300">
                {area.incidents} active incident{area.incidents !== 1 ? 's' : ''}
              </div>
            ) : (
              <div className="rounded-md bg-green-100 dark:bg-green-900/30 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-300">
                All clear
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
