'use client'

import { Wrench, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface MaintenanceCardProps {
  title: string
  type: 'scheduled' | 'emergency' | 'preventive'
  status: 'pending' | 'in-progress' | 'completed'
  assignee: string
  dueDate: string
  priority: 'low' | 'medium' | 'high'
}

export function MaintenanceCard({ title, type, status, assignee, dueDate, priority }: MaintenanceCardProps) {
  const statusColor = {
    pending: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400',
    'in-progress': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    completed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  }[status]

  const priorityColor = {
    low: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  }[priority]

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-base">{title}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{type.charAt(0).toUpperCase() + type.slice(1)}</p>
          </div>
          <Badge className={priorityColor}>
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center text-sm">
          <p className="text-muted-foreground">Status</p>
          <Badge className={statusColor}>
            {status === 'in-progress' ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-muted-foreground">Assignee</p>
            <p className="font-medium">{assignee}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Due Date</p>
            <p className="font-medium">{dueDate}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
