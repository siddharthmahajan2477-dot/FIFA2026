'use client'

import React, { useState, useEffect } from 'react'
import { WasteCard } from '@/components/infrastructure/WasteCard'
import { KPIWidget } from '@/components/infrastructure/KPIWidget'

export default function WastePage() {
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
          <h1 className="text-4xl font-bold text-foreground">Waste Management</h1>
          <p className="mt-2 text-lg text-muted-foreground">Collection, recycling, and disposal tracking</p>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <KPIWidget title="Collected Today" value="0" unit="kg" trend="stable" change={0} />
          <KPIWidget title="Recycling Rate" value="0" unit="%" trend="stable" change={0} />
          <KPIWidget title="Bins Status" value="0/0" unit="full" />
          <KPIWidget title="Carbon Saved" value="0.0" unit="tons" />
        </div>

        {/* Waste Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <WasteCard type="recycling" collected={0} percentage={0} status="pending" />
          <WasteCard type="organic" collected={0} percentage={0} status="pending" />
          <WasteCard type="collection" collected={0} percentage={0} status="pending" />
          <WasteCard type="plastic" collected={0} percentage={0} status="pending" />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="rounded-lg border border-border bg-card p-6 text-card-foreground">
            <h3 className="text-lg font-bold mb-4">Waste Distribution</h3>
            <div className="h-[250px] flex items-center justify-center border border-dashed border-border/40 rounded-xl text-xs text-muted-foreground bg-card/10">
              No analytics available
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 text-card-foreground">
            <h3 className="text-lg font-bold mb-4">Weekly Collection</h3>
            <div className="h-[250px] flex items-center justify-center border border-dashed border-border/40 rounded-xl text-xs text-muted-foreground bg-card/10">
              No analytics available
            </div>
          </div>
        </div>

        {/* Collection Points */}
        <div className="rounded-lg border border-border bg-card p-6 text-card-foreground">
          <h3 className="text-lg font-bold mb-4">Collection Points Status</h3>
          <p className="text-xs text-muted-foreground">No collection points monitored</p>
        </div>
      </div>
    </main>
  )
}
