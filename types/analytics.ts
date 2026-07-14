export interface AnalyticsDataPoint {
  time: string
  value: number
  secondaryValue?: number
}

export interface AIInsight {
  id: string | number
  title: string
  insight: string
  confidence: number
  impact: 'low' | 'medium' | 'high'
}
