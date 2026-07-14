'use client'

import { CheckCircle2, Circle, Trash2 } from 'lucide-react'

interface TaskCardProps {
  id: string
  title: string
  assignedTo: string
  dueTime: string
  priority: 'low' | 'medium' | 'high'
  completed: boolean
  onToggle?: (id: string) => void
  onDelete?: (id: string) => void
}

export function TaskCard({
  id,
  title,
  assignedTo,
  dueTime,
  priority,
  completed,
  onToggle,
  onDelete,
}: TaskCardProps) {
  const priorityColors = {
    low: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
    medium: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
    high: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
  }

  return (
    <div
      className={`rounded-lg border p-4 transition-all ${
        completed
          ? 'border-border bg-muted/50'
          : 'border-border bg-card hover:shadow-md'
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggle?.(id)}
          className="mt-1 flex-shrink-0 text-muted-foreground transition-colors hover:text-foreground"
        >
          {completed ? (
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          ) : (
            <Circle className="h-5 w-5" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <h3
            className={`font-semibold transition-all ${
              completed
                ? 'line-through text-muted-foreground'
                : 'text-foreground'
            }`}
          >
            {title}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Assigned to: {assignedTo}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span className={`rounded px-2 py-1 text-xs font-medium ${priorityColors[priority]}`}>
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </span>
            <span className="text-xs text-muted-foreground">Due: {dueTime}</span>
          </div>
        </div>

        <button
          onClick={() => onDelete?.(id)}
          className="flex-shrink-0 text-muted-foreground transition-colors hover:text-red-500"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
