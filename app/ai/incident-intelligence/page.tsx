'use client'

import React, { useState, useEffect } from 'react'
import { AIService } from '../../../services/ai.service'
import { AlertCircle } from 'lucide-react'

export default function IncidentIntelligence() {
  const [loading, setLoading] = useState(true)
  const [incidents, setIncidents] = useState<any[]>([])

  useEffect(() => {
    const load = async () => {
      try {
        const data = await AIService.getIncidentIntelligence()
        setIncidents(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-background py-8 animate-pulse">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="h-32 bg-card/50 rounded-xl" />
          <div className="h-40 bg-card/50 rounded-xl" />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground">Incident Intelligence</h1>
          <p className="mt-2 text-lg text-muted-foreground">Real-time incident analysis, pattern detection, and prevention</p>
        </div>

        {/* Empty State */}
        <div className="rounded-xl border border-dashed border-border/40 bg-card/10 p-8 text-center text-xs text-muted-foreground flex flex-col items-center justify-center gap-2">
          <AlertCircle className="h-8 w-8 opacity-35" />
          <p className="font-bold">No security or medical incident anomalies detected</p>
          <p className="opacity-75">All operational zones nominal</p>
        </div>

      </div>
    </main>
  )
}
