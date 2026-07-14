import { useState, useEffect } from 'react'
import { TicketService } from '../services/ticket.service'
import { Ticket } from '../types/ticket'

export function useTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetch = async () => {
      try {
        const list = await TicketService.getTickets()
        setTickets(list)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  return { tickets, loading, error }
}
