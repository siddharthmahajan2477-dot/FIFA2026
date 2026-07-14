import { useState, useEffect } from 'react'
import { MatchService } from '../services/match.service'
import { Match, MatchCountdown } from '../types/match'

export function useMatches() {
  const [matches, setMatches] = useState<Match[]>([])
  const [countdown, setCountdown] = useState<MatchCountdown | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const [mList, cTime] = await Promise.all([
          MatchService.getMatches(),
          MatchService.getCountdown(),
        ])
        setMatches(mList)
        setCountdown(cTime)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }
    fetchMatches()
  }, [])

  return { matches, countdown, loading, error }
}
