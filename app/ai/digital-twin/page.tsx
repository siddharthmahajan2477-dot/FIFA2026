'use client'

import React, { useState, useEffect } from 'react'
import { AIService } from '../../../services/ai.service'
import { AlertCircle } from 'lucide-react'

export default function DigitalTwin() {
  const [loading, setLoading] = useState(true)
  const [telemetry, setTelemetry] = useState<any[]>([])

  useEffect(() => {
    const load = async () => {
      try {
        const data = await AIService.getDigitalTwinTelemetry()
        setTelemetry(data)
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
          <div className="h-64 bg-card/50 rounded-xl" />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground">Digital Twin</h1>
          <p className="mt-2 text-lg text-muted-foreground">Real-time visualization and monitoring of all stadium systems</p>
        </div>

        {/* Empty State */}
        <div className="rounded-xl border border-dashed border-border/40 bg-card/10 p-8 text-center text-xs text-muted-foreground flex flex-col items-center justify-center gap-2">
          <AlertCircle className="h-8 w-8 opacity-35" />
          <p className="font-bold">No digital twin systems connected</p>
          <p className="opacity-75">Connect 3D telemetry sensors to initiate feed</p>
        </div>

      </div>
    </main>
  )
}
