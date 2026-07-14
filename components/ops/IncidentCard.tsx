import { Clock, MapPin, AlertCircle } from 'lucide-react'
import { StatusBadge } from './StatusBadge'

interface IncidentCardProps {
  id: string
  title: string
  description: string
  location: string
  time: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  status: 'pending' | 'active' | 'resolved'
  assignedTo?: string
  onClick?: () => void
}

export function IncidentCard({
  id,
  title,
  description,
  location,
  time,
  severity,
  status,
  assignedTo,
  onClick,
}: IncidentCardProps) {
  const severityColors = {
    low: 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30',
    medium: 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950/30',
    high: 'border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/30',
    critical: 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30',
  }

  const severityTextColors = {
    low: 'text-blue-700 dark:text-blue-300',
    medium: 'text-yellow-700 dark:text-yellow-300',
    high: 'text-orange-700 dark:text-orange-300',
    critical: 'text-red-700 dark:text-red-300',
  }

  return (
    <div
      onClick={onClick}
      className={`rounded-lg border p-4 transition-all ${severityColors[severity]} ${
        onClick ? 'cursor-pointer hover:shadow-md' : ''
      }`}
    >
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-start gap-2">
          <AlertCircle className={`h-5 w-5 flex-shrink-0 ${severityTextColors[severity]}`} />
          <div>
            <h3 className="font-semibold text-foreground">{title}</h3>
            <p className="text-xs text-muted-foreground">ID: {id}</p>
          </div>
        </div>
        <StatusBadge status={status} size="sm" />
      </div>

      <p className="mb-3 text-sm text-foreground">{description}</p>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{time}</span>
        </div>
        {assignedTo && <div className="text-xs text-muted-foreground">Assigned to: {assignedTo}</div>}
      </div>
    </div>
  )
}
