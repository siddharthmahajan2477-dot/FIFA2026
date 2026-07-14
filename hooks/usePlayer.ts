import { useState, useEffect } from 'react'
import { PlayerService } from '../services/player.service'
import { Player } from '../types/player'

export function usePlayer() {
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetch = async () => {
      try {
        const list = await PlayerService.getPlayers()
        setPlayers(list)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  return { players, loading, error }
}
