'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Users, TrendingUp, AlertCircle, Home } from 'lucide-react'
import { KPICard } from '@/components/ops/KPICard'
import { AreaStatusGrid } from '@/components/ops/AreaStatusGrid'
import { AlertBanner } from '@/components/ops/AlertBanner'

export default function CrowdManagementPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  const crowdStats = [
    { title: 'Current Attendance', value: 0, unit: 'people', trend: 'stable' as const, trendPercent: 0, icon: <Users className="h-6 w-6" /> },
    { title: 'Stadium Capacity', value: '0%', unit: 'full', status: 'normal' as const, icon: <TrendingUp className="h-6 w-6" /> },
    { title: 'Entry Rate', value: 0, unit: 'per min', trend: 'stable' as const, trendPercent: 0, icon: <Users className="h-6 w-6" /> },
    { title: 'Bottlenecks', value: 0, unit: 'reported', status: 'normal' as const, icon: <AlertCircle className="h-6 w-6" /> },
  ]

  if (loading) {
    return (
      <main className="min-h-screen bg-background py-12 sm:py-16 animate-pulse">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="h-32 bg-card/50 rounded-xl" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="h-28 bg-card/50 rounded-xl" />
            <div className="h-28 bg-card/50 rounded-xl" />
            <div className="h-28 bg-card/50 rounded-xl" />
            <div className="h-28 bg-card/50 rounded-xl" />
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link href="/operations" className="mb-4 inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
              <Home className="h-4 w-4" />
              <span className="text-sm">Back to Operations</span>
            </Link>
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Crowd Management</h1>
            <p className="mt-2 text-muted-foreground">Monitor crowd flow and gate operations</p>
          </div>
        </div>

        {/* Alerts */}
        <div className="mb-8 space-y-3">
          <AlertBanner
            type="info"
            title="Crowd Operations Status"
            message="All stadium entry parameters nominal. No queues reported."
          />
        </div>

        {/* KPI Cards */}
        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {crowdStats.map((stat, idx) => (
            <KPICard
              key={idx}
              title={stat.title}
              value={stat.value}
              unit={stat.unit}
              trend={stat.trend}
              trendPercent={stat.trendPercent}
              icon={stat.icon}
              status={stat.status}
            />
          ))}
        </div>

        {/* Gate Status */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground">Gate & Area Status</h2>
            <p className="mt-1 text-sm text-muted-foreground">Real-time occupancy levels for all entry points and areas</p>
          </div>
          <AreaStatusGrid areas={[]} />
          <div className="text-center text-xs text-muted-foreground p-8 border border-dashed border-border/40 rounded-xl bg-card/10 mt-4">
            No active areas monitored
          </div>
        </div>

        {/* Controls and Actions */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Flow Control */}
          <div className="rounded-lg border border-border bg-card p-6 opacity-60">
            <h3 className="mb-4 font-bold text-foreground">Flow Control</h3>
            <p className="text-xs text-muted-foreground">System controls disabled until live telemetry connects.</p>
          </div>

          {/* Announcements */}
          <div className="rounded-lg border border-border bg-card p-6 opacity-60">
            <h3 className="mb-4 font-bold text-foreground">Quick Announcements</h3>
            <p className="text-xs text-muted-foreground">Announcements broadcast server offline.</p>
          </div>
        </div>

        {/* Live Statistics Table */}
        <div className="mt-12 rounded-lg border border-border bg-card p-6">
          <h2 className="mb-6 text-2xl font-bold text-foreground">Gate Statistics</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Gate</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Capacity</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Current</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Utilization</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Queue Time</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-xs text-muted-foreground">
                    No gate statistics online
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}
