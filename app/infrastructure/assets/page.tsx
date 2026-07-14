'use client'

import React, { useState, useEffect } from 'react'
import { KPIWidget } from '@/components/infrastructure/KPIWidget'
import { AlertCircle } from 'lucide-react'

export default function AssetsPage() {
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
          <h1 className="text-4xl font-bold text-foreground">Asset Management</h1>
          <p className="mt-2 text-lg text-muted-foreground">Equipment inventory and lifecycle tracking</p>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <KPIWidget title="Total Assets" value="0" />
          <KPIWidget title="Operational" value="0" trend="stable" change={0} />
          <KPIWidget title="In Maintenance" value="0" />
          <KPIWidget title="Warranty Coverage" value="0" unit="%" />
        </div>

        {/* Asset Categories */}
        <div className="rounded-xl border border-dashed border-border/40 bg-card/10 p-8 text-center text-xs text-muted-foreground flex flex-col items-center justify-center gap-2 mb-8">
          <AlertCircle className="h-8 w-8 opacity-35" />
          <p className="font-bold">No assets registered</p>
        </div>
      </div>
    </main>
  )
}
