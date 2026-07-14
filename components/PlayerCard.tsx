import React from 'react'

interface PlayerCardProps {
  name: string
  number?: number
  position?: string
  team?: string
  goals?: number
  assists?: number
  minutesPlayed?: number
  status?: 'active' | 'injured' | 'suspended'
  onClick?: () => void
}

export function PlayerCard({
  name,
  number,
  position,
  team,
  goals,
  assists,
  minutesPlayed,
  status = 'active',
  onClick,
}: PlayerCardProps) {
  const statusColors = {
    active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    injured: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    suspended: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  }

  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-lg border border-border bg-card p-4 text-card-foreground transition-all hover:border-primary hover:shadow-md"
    >
      <div className="mb-3 flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            {number && <span className="text-sm font-bold text-muted-foreground">#{number}</span>}
            <p className="text-sm font-bold text-foreground">{name}</p>
          </div>
          {team && <p className="text-xs text-muted-foreground">{team}</p>}
        </div>
        <span className={`rounded px-2 py-1 text-xs font-semibold capitalize ${statusColors[status]}`}>{status}</span>
      </div>

      {position && (
        <div className="mb-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase">{position}</p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-2 text-xs">
        {goals !== undefined && (
          <div>
            <p className="text-muted-foreground">Goals</p>
            <p className="font-bold text-foreground">{goals}</p>
          </div>
        )}
        {assists !== undefined && (
          <div>
            <p className="text-muted-foreground">Assists</p>
            <p className="font-bold text-foreground">{assists}</p>
          </div>
        )}
        {minutesPlayed !== undefined && (
          <div>
            <p className="text-muted-foreground">Mins</p>
            <p className="font-bold text-foreground">{minutesPlayed}</p>
          </div>
        )}
      </div>
    </div>
  )
}
