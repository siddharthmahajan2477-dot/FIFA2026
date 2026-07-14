'use client'

import React, { useState, useEffect } from 'react'
import { KPIWidget } from '@/components/infrastructure/KPIWidget'
import { Leaf } from 'lucide-react'

export default function SustainabilityPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-background py-8 animate-pulse">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="h-32 bg-card/50 rounded-xl" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-card/50 rounded-xl" />
            ))}
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground">Sustainability Dashboard</h1>
          <p className="mt-2 text-lg text-muted-foreground">Environmental impact and sustainability metrics</p>
        </div>

        {/* Main KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <KPIWidget title="Green Score" value="0" unit="/100" trend="stable" change={0} icon={<Leaf />} />
          <KPIWidget title="Carbon Footprint" value="0.0" unit="tons/day" trend="stable" change={0} />
          <KPIWidget title="Energy Saved" value="0" unit="%" trend="stable" change={0} />
          <KPIWidget title="Water Saved" value="0" unit="%" trend="stable" change={0} />
        </div>

        {/* Score Trend */}
        <div className="rounded-lg border border-border bg-card p-6 text-card-foreground mb-8">
          <h3 className="text-lg font-bold mb-4">Sustainability Score Trend</h3>
          <div className="h-[300px] flex items-center justify-center border border-dashed border-border/40 rounded-xl text-xs text-muted-foreground bg-card/10">
            No analytics available
          </div>
        </div>
      </div>
    </main>
  )
}
