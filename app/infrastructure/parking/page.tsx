'use client'

import React, { useState, useEffect } from 'react'
import { ParkingCard } from '@/components/infrastructure/ParkingCard'
import { KPIWidget } from '@/components/infrastructure/KPIWidget'
import { MapPin } from 'lucide-react'

export default function ParkingPage() {
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
          <h1 className="text-4xl font-bold text-foreground">Smart Parking Management</h1>
          <p className="mt-2 text-lg text-muted-foreground">Real-time parking availability and management</p>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <KPIWidget title="Total Occupancy" value="0%" trend="stable" change={0} icon={<MapPin />} />
          <KPIWidget title="Available Slots" value="0" unit="spaces" />
          <KPIWidget title="Revenue Today" value="$0.00" trend="stable" change={0} />
          <KPIWidget title="Peak Hour" value="--" />
        </div>

        {/* Parking Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <ParkingCard type="standard" available={0} occupied={0} capacity={0} status="closed" />
          <ParkingCard type="vip" available={0} occupied={0} capacity={0} status="closed" />
          <ParkingCard type="accessible" available={0} occupied={0} capacity={0} status="closed" />
          <ParkingCard type="charging" available={0} occupied={0} capacity={0} status="closed" />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 rounded-lg border border-border bg-card p-6 text-card-foreground">
            <h3 className="text-lg font-bold mb-4">Occupancy Trend</h3>
            <div className="h-[300px] flex items-center justify-center border border-dashed border-border/40 rounded-xl text-xs text-muted-foreground bg-card/10">
              No analytics available
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 text-card-foreground">
            <h3 className="text-lg font-bold mb-4">Distribution</h3>
            <div className="h-[250px] flex items-center justify-center border border-dashed border-border/40 rounded-xl text-xs text-muted-foreground bg-card/10">
              No analytics available
            </div>
          </div>
        </div>

        {/* Gates Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-lg border border-border bg-card p-6 text-card-foreground">
            <h3 className="text-lg font-bold mb-4">Entry Gates</h3>
            <div className="space-y-3">
              {['Gate A', 'Gate B', 'Gate C'].map((gate) => (
                <div key={gate} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border/40">
                  <span className="font-medium">{gate}</span>
                  <span className="text-xs text-muted-foreground font-semibold">Disconnected</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
