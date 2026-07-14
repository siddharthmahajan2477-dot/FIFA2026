'use client'

import React, { useState, useEffect } from 'react'
import { KPIWidget } from '@/components/infrastructure/KPIWidget'
import { AlertCircle } from 'lucide-react'

export default function MaintenancePage() {
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
          <h1 className="text-4xl font-bold text-foreground">Maintenance Management</h1>
          <p className="mt-2 text-lg text-muted-foreground">Scheduled maintenance and emergency repairs</p>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <KPIWidget title="Open Requests" value="0" trend="stable" change={0} />
          <KPIWidget title="In Progress" value="0" />
          <KPIWidget title="Completion Rate" value="0" unit="%" trend="stable" change={0} />
          <KPIWidget title="Avg Response" value="0.0" unit="hrs" />
        </div>

        {/* Maintenance Requests */}
        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-bold">Active Requests</h3>
          <div className="rounded-xl border border-dashed border-border/40 bg-card/10 p-8 text-center text-xs text-muted-foreground flex flex-col items-center justify-center gap-2">
            <AlertCircle className="h-8 w-8 opacity-35" />
            <p className="font-bold">No active requests logged</p>
          </div>
        </div>
      </div>
    </main>
  )
}
