import React from 'react'
import { Goal, Clock, AlertCircle, Zap } from 'lucide-react'

interface TimelineEvent {
  id: string
  minute: number
  player: string
  team: string
  event: 'goal' | 'assist' | 'yellow-card' | 'red-card' | 'substitution'
  details?: string
}

interface EventTimelineProps {
  events: TimelineEvent[]
}

const eventIcons = {
  goal: Goal,
  assist: Zap,
  'yellow-card': AlertCircle,
  'red-card': AlertCircle,
  substitution: Clock,
}

const eventColors = {
  goal: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  assist: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'yellow-card': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  'red-card': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  substitution: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
}

export function EventTimeline({ events }: EventTimelineProps) {
  return (
    <div className="space-y-3">
      {events.map((event, index) => {
        const Icon = eventIcons[event.event]
        return (
          <div key={event.id} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className={`rounded-full p-2 ${eventColors[event.event]}`}>
                <Icon className="h-4 w-4" />
              </div>
              {index < events.length - 1 && <div className="my-1 h-6 w-0.5 bg-border" />}
            </div>
            <div className="flex-1 pt-0.5">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-bold text-foreground">{event.player}</p>
                  <p className="text-xs text-muted-foreground">{event.team}</p>
                </div>
                <p className="text-xs font-semibold text-muted-foreground">{event.minute}&apos;</p>
              </div>
              {event.details && <p className="mt-1 text-xs text-muted-foreground">{event.details}</p>}
            </div>
          </div>
        )
      })}
    </div>
  )
}
