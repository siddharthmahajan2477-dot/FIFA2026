'use client'

import React, { useState, useEffect } from 'react'
import { KPIWidget } from '@/components/infrastructure/KPIWidget'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'

export default function TransportationPage() {
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
          <h1 className="text-4xl font-bold text-foreground">Transportation Hub</h1>
          <p className="mt-2 text-lg text-muted-foreground">Multi-modal transport coordination and tracking</p>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <KPIWidget title="Active Routes" value="0" trend="stable" change={0} />
          <KPIWidget title="Total Passengers" value="0" trend="stable" change={0} />
          <KPIWidget title="Avg ETA" value="--" />
          <KPIWidget title="On-Time %" value="0" unit="%" />
        </div>

        {/* Transport Modes */}
        <div className="rounded-xl border border-dashed border-border/40 bg-card/10 p-8 text-center text-xs text-muted-foreground flex flex-col items-center justify-center gap-2 mb-8">
          <AlertCircle className="h-8 w-8 opacity-35" />
          <p className="font-bold">No transportation modes connected</p>
        </div>

        {/* ETA Chart */}
        <div className="rounded-lg border border-border bg-card p-6 text-card-foreground mb-8">
          <h3 className="text-lg font-bold mb-4">Average ETA Trends</h3>
          <div className="h-[300px] flex items-center justify-center border border-dashed border-border/40 rounded-xl text-xs text-muted-foreground bg-card/10">
            No analytics available
          </div>
        </div>

        {/* Alerts & Routes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Transport Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">No active transport alerts logged</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
