'use client'

import React, { useState, useEffect } from 'react'
import { WaterCard } from '@/components/infrastructure/WaterCard'
import { KPIWidget } from '@/components/infrastructure/KPIWidget'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Droplets } from 'lucide-react'

export default function WaterPage() {
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
          <h1 className="text-4xl font-bold text-foreground">Water Management</h1>
          <p className="mt-2 text-lg text-muted-foreground">Water consumption and quality monitoring</p>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <KPIWidget title="Daily Consumption" value="0" unit="m³" />
          <KPIWidget title="Storage Level" value="0" unit="%" />
          <KPIWidget title="Water Quality" value="--" />
          <KPIWidget title="Leak Risk" value="Low" />
        </div>

        {/* Water Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <WaterCard type="consumption" value={0} unit="m³/hr" max={100} />
          <WaterCard type="storage" value={0} unit="m³" max={100} />
          <WaterCard type="quality" value={0} unit="%" />
          <WaterCard type="leaks" value={0} unit="detected" />
        </div>

        {/* Chart */}
        <div className="rounded-lg border border-border bg-card p-6 text-card-foreground mb-8">
          <h3 className="text-lg font-bold mb-4">Daily Usage & Storage</h3>
          <div className="h-[300px] flex items-center justify-center border border-dashed border-border/40 rounded-xl text-xs text-muted-foreground bg-card/10">
            No analytics available
          </div>
        </div>

        {/* Status Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-teal-500" />
                Pump Stations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Status: Disconnected</p>
              <p className="font-bold text-lg mt-2">0.0 bar Pressure</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
