import React from 'react'
import { LiveIndicator } from './LiveIndicator'

interface MatchCardProps {
  homeTeam: string
  awayTeam: string
  homeScore?: number
  awayScore?: number
  time?: string
  isLive?: boolean
  status?: 'upcoming' | 'live' | 'completed'
  onClick?: () => void
}

export function MatchCard({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  time,
  isLive = false,
  status = 'upcoming',
  onClick,
}: MatchCardProps) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-lg border border-border bg-card p-4 text-card-foreground transition-all hover:border-primary hover:shadow-md"
    >
      <div className="flex items-center justify-between pb-3">
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase text-muted-foreground">FIFA World Cup</p>
        </div>
        {isLive && <LiveIndicator />}
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex-1">
          <p className="text-sm font-bold text-foreground">{homeTeam}</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          {homeScore !== undefined && awayScore !== undefined ? (
            <div className="flex items-center gap-2">
              <span className="w-6 text-center text-2xl font-bold text-foreground">{homeScore}</span>
              <span className="text-xs font-semibold text-muted-foreground">-</span>
              <span className="w-6 text-center text-2xl font-bold text-foreground">{awayScore}</span>
            </div>
          ) : (
            <p className="text-sm font-semibold text-muted-foreground">{time || 'TBD'}</p>
          )}
          {isLive && <p className="text-xs font-medium text-primary">Live</p>}
        </div>
        <div className="flex-1 text-right">
          <p className="text-sm font-bold text-foreground">{awayTeam}</p>
        </div>
      </div>
    </div>
  )
}
