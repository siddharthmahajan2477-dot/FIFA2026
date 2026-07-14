'use client'

import React, { useState, useEffect } from 'react'
import { EnergyCard } from '@/components/infrastructure/EnergyCard'
import { KPIWidget } from '@/components/infrastructure/KPIWidget'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Zap, Sun, Battery } from 'lucide-react'

export default function EnergyPage() {
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
          <h1 className="text-4xl font-bold text-foreground">Energy Management</h1>
          <p className="mt-2 text-lg text-muted-foreground">Smart energy distribution and sustainability</p>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <KPIWidget title="Current Usage" value="0" unit="kW" trend="stable" change={0} />
          <KPIWidget title="Solar Output" value="0" unit="kW" trend="stable" change={0} />
          <KPIWidget title="Battery Level" value="0" unit="%" />
          <KPIWidget title="Renewable %" value="0" unit="%" trend="stable" change={0} />
        </div>

        {/* Energy Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <EnergyCard type="usage" value={0} unit="kW" max={100} status="closed" />
          <EnergyCard type="solar" value={0} unit="kW" trend={0} status="closed" />
          <EnergyCard type="battery" value={0} unit="%" max={100} status="closed" />
          <EnergyCard type="generator" value={0} unit="kW" status="closed" />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="rounded-lg border border-border bg-card p-6 text-card-foreground">
            <h3 className="text-lg font-bold mb-4">Energy Mix</h3>
            <div className="h-[300px] flex items-center justify-center border border-dashed border-border/40 rounded-xl text-xs text-muted-foreground bg-card/10">
              No analytics available
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 text-card-foreground">
            <h3 className="text-lg font-bold mb-4">Zone Consumption</h3>
            <div className="h-[300px] flex items-center justify-center border border-dashed border-border/40 rounded-xl text-xs text-muted-foreground bg-card/10">
              No analytics available
            </div>
          </div>
        </div>

        {/* Status Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Sun className="h-5 w-5 text-yellow-500" />
                Solar Panels
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Status: Offline</p>
              <p className="font-bold text-lg mt-2">0 kW Generated</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Battery className="h-5 w-5 text-blue-500" />
                Battery Backup
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Status: Disconnected</p>
              <p className="font-bold text-lg mt-2">0% Charge</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
