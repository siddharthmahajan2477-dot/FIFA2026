export interface Match {
  id: string | number
  homeTeam: string
  awayTeam: string
  homeScore: number | null
  awayScore: number | null
  status: 'scheduled' | 'live' | 'completed'
  date: Date | string
  venue: string
  time?: string
  isLive?: boolean
}

export interface MatchCountdown {
  targetDate: string
  days: number
  hours: number
  minutes: number
  seconds: number
}
