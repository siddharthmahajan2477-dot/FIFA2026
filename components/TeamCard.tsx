import React from 'react'

interface TeamCardProps {
  teamName: string
  flag?: string
  position?: number
  played?: number
  wins?: number
  draws?: number
  losses?: number
  goalsFor?: number
  goalsAgainst?: number
  points?: number
  onClick?: () => void
}

export function TeamCard({
  teamName,
  flag,
  position,
  played,
  wins,
  draws,
  losses,
  goalsFor,
  goalsAgainst,
  points,
  onClick,
}: TeamCardProps) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-lg border border-border bg-card p-4 text-card-foreground transition-all hover:border-primary hover:shadow-md"
    >
      <div className="flex items-center gap-3 pb-3">
        {position && (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            {position}
          </div>
        )}
        <div className="flex-1">
          <p className="text-sm font-bold text-foreground">{teamName}</p>
          {flag && <p className="text-lg">{flag}</p>}
        </div>
      </div>

      {played !== undefined && (
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <p className="text-muted-foreground">P</p>
            <p className="font-bold text-foreground">{played}</p>
          </div>
          <div>
            <p className="text-muted-foreground">W-D-L</p>
            <p className="font-bold text-foreground">
              {wins}-{draws}-{losses}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">GF:GA</p>
            <p className="font-bold text-foreground">
              {goalsFor}:{goalsAgainst}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Pts</p>
            <p className="font-bold text-primary">{points}</p>
          </div>
        </div>
      )}
    </div>
  )
}
