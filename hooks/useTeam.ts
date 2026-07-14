import { useState, useEffect } from 'react'
import { TeamService } from '../services/team.service'
import { Team } from '../types/team'

export function useTeam() {
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetch = async () => {
      try {
        const list = await TeamService.getTeams()
        setTeams(list)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  return { teams, loading, error }
}
