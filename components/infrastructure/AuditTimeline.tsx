'use client'

import { LogIn, Edit3, Trash2, Lock, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface AuditEvent {
  id: string
  user: string
  action: 'login' | 'create' | 'update' | 'delete' | 'security' | 'error'
  resource: string
  timestamp: string
  details?: string
}

interface AuditTimelineProps {
  events: AuditEvent[]
}

export function AuditTimeline({ events }: AuditTimelineProps) {
  const actionIcons = {
    login: <LogIn className="h-4 w-4" />,
    create: <Edit3 className="h-4 w-4" />,
    update: <Edit3 className="h-4 w-4" />,
    delete: <Trash2 className="h-4 w-4" />,
    security: <Lock className="h-4 w-4" />,
    error: <AlertCircle className="h-4 w-4" />,
  }

  const actionColors = {
    login: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    create: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    update: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    delete: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    security: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    error: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event, idx) => (
            <div key={event.id} className="flex gap-4 pb-4 last:pb-0 border-b last:border-b-0">
              <div>
                <Badge className={actionColors[event.action]}>
                  {actionIcons[event.action]}
                </Badge>
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{event.user}</p>
                <p className="text-sm text-muted-foreground">
                  {event.action.charAt(0).toUpperCase() + event.action.slice(1)} {event.resource}
                </p>
                {event.details && (
                  <p className="text-xs text-muted-foreground mt-1">{event.details}</p>
                )}
              </div>
              <p className="text-xs text-muted-foreground whitespace-nowrap">{event.timestamp}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
