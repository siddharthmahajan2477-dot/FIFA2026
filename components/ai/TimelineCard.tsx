'use client'

interface TimelineEvent {
  time: string
  title: string
  description: string
  type: 'event' | 'alert' | 'action' | 'milestone'
}

interface TimelineCardProps {
  events: TimelineEvent[]
  title: string
}

export function TimelineCard({ events, title }: TimelineCardProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'alert':
        return 'bg-red-100 text-red-800 border-red-300'
      case 'action':
        return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'milestone':
        return 'bg-green-100 text-green-800 border-green-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="font-semibold text-foreground mb-6">{title}</h3>
      <div className="space-y-4">
        {events.map((event, idx) => (
          <div key={idx} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className={`h-3 w-3 rounded-full border-2 ${getTypeColor(event.type)}`} />
              {idx !== events.length - 1 && (
                <div className="w-0.5 h-16 bg-border mt-2" />
              )}
            </div>
            <div className="pb-4">
              <p className="text-xs text-muted-foreground font-medium">{event.time}</p>
              <p className="text-sm font-semibold text-foreground mt-0.5">{event.title}</p>
              <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
