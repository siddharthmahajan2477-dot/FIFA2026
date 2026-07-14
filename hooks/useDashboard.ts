import { useState, useEffect } from 'react'

export function useDashboard() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/dashboard`)
        if (!res.ok) throw new Error('Failed to load dashboard data')
        const json = await res.json()
        setData(json)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }
    loadDashboard()
  }, [])

  return { data, loading, error }
}
