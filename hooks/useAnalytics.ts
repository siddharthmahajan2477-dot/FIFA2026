import { useState, useEffect } from 'react'
import { AnalyticsService } from '../services/analytics.service'
import { AnalyticsDataPoint, AIInsight } from '../types/analytics'

export function useAnalytics() {
  const [history, setHistory] = useState<AnalyticsDataPoint[]>([])
  const [insights, setInsights] = useState<AIInsight[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetch = async () => {
      try {
        const [hData, iData] = await Promise.all([
          AnalyticsService.getUsageHistory(),
          AnalyticsService.getInsights(),
        ])
        setHistory(hData)
        setInsights(iData)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  return { history, insights, loading, error }
}
