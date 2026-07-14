'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Users, TrendingUp, AlertCircle, Home } from 'lucide-react'
import { KPICard } from '@/components/ops/KPICard'
import { AlertBanner } from '@/components/ops/AlertBanner'

export default function ExecutivePage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  const executiveStats = [
    { title: 'Total Attendance', value: 0, unit: 'people', trend: 'stable' as const, trendPercent: 0, icon: <Users className="h-6 w-6" /> },
    { title: 'Revenue (Estimated)', value: '$0.00', unit: 'ticket sales', trend: 'stable' as const, trendPercent: 0, icon: <TrendingUp className="h-6 w-6" /> },
    { title: 'Active Incidents', value: 0, unit: 'managed', status: 'normal' as const, icon: <AlertCircle className="h-6 w-6" /> },
    { title: 'Staff Utilization', value: '0%', unit: 'deployed', status: 'normal' as const, icon: <Users className="h-6 w-6" /> },
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
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Executive Dashboard</h1>
            <p className="mt-2 text-muted-foreground">Strategic overview and real-time analytics</p>
          </div>
        </div>

        {/* Alerts */}
        <div className="mb-8 space-y-3">
          <AlertBanner
            type="info"
            title="Event Status"
            message="No system active sessions found."
          />
        </div>

        {/* KPI Cards */}
        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {executiveStats.map((stat, idx) => (
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

        {/* Main Analytics */}
        <div className="grid gap-8 lg:grid-cols-3">
          
          {/* Department Summary */}
          <div className="lg:col-span-2 space-y-8">
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="mb-6 text-2xl font-bold text-foreground">Department Status Overview</h2>
              <div className="space-y-4">
                {[
                  { dept: 'Security Operations', status: 'Optimal', incidents: 0, personnel: 0 },
                  { dept: 'Medical Services', status: 'Optimal', incidents: 0, personnel: 0 },
                  { dept: 'Crowd Management', status: 'Optimal', incidents: 0, personnel: 0 },
                  { dept: 'Volunteer Services', status: 'Optimal', incidents: 0, personnel: 0 },
                  { dept: 'Communications', status: 'Optimal', incidents: 0, personnel: 0 },
                ].map((dept, idx) => (
                  <div key={idx} className="flex items-center justify-between rounded-lg border border-border/50 p-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{dept.dept}</h3>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {dept.personnel} personnel • {dept.incidents} incidents
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block rounded-full bg-neutral-900 px-3 py-1 text-xs font-medium text-neutral-400">
                        {dept.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Summary */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="mb-6 text-2xl font-bold text-foreground">Financial Overview</h2>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg bg-muted/50 p-4">
                  <p className="text-xs text-muted-foreground">Ticket Revenue</p>
                  <p className="mt-2 text-2xl font-bold text-foreground">$0.00</p>
                  <p className="mt-1 text-xs text-muted-foreground">0% vs. forecast</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-4">
                  <p className="text-xs text-muted-foreground">Merchandise Sales</p>
                  <p className="mt-2 text-2xl font-bold text-foreground">$0.00</p>
                  <p className="mt-1 text-xs text-muted-foreground">0% vs. avg</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-4">
                  <p className="text-xs text-muted-foreground">F&B Revenue</p>
                  <p className="mt-2 text-2xl font-bold text-foreground">$0.00</p>
                  <p className="mt-1 text-xs text-muted-foreground">0% vs. forecast</p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="space-y-6">
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-4 font-bold text-foreground">Key Metrics</h3>
              <div className="space-y-4">
                {[
                  { label: 'Stadium Capacity', value: '0%' },
                  { label: 'Staff Deployment', value: '0%' },
                  { label: 'Medical Response', value: '0%' },
                  { label: 'Security Coverage', value: '0%' },
                ].map((m) => (
                  <div key={m.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-muted-foreground">{m.label}</span>
                      <span className="text-sm font-semibold text-foreground">{m.value}</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full w-0 bg-primary" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-4 font-bold text-foreground">Risk Assessment</h3>
              <div className="space-y-2 text-sm">
                {[
                  { label: 'Security Threats', val: 'Low' },
                  { label: 'Medical Incidents', val: 'Low' },
                  { label: 'Crowd Control', val: 'Low' },
                  { label: 'Infrastructure', val: 'Stable' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="rounded-full bg-neutral-900 px-2 py-1 text-xs font-medium text-neutral-400">
                      {item.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-12 rounded-lg border border-border bg-card p-6">
          <h2 className="mb-6 text-2xl font-bold text-foreground">Strategic Recommendations</h2>
          <div className="rounded-xl border border-dashed border-border/40 bg-card/10 p-8 text-center text-xs text-muted-foreground">
            No recommendations available
          </div>
        </div>
      </div>
    </main>
  )
}
