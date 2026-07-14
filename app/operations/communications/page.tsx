'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { MessageCircle, AlertTriangle, Send, Home } from 'lucide-react'
import { KPICard } from '@/components/ops/KPICard'
import { AlertBanner } from '@/components/ops/AlertBanner'

export default function CommunicationsPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  const commStats = [
    { title: 'Messages Sent', value: 0, unit: 'today', trend: 'stable' as const, trendPercent: 0, icon: <MessageCircle className="h-6 w-6" /> },
    { title: 'Active Incidents', value: 0, unit: 'reported', status: 'normal' as const, icon: <AlertTriangle className="h-6 w-6" /> },
    { title: 'Alert Delivery', value: '0.0%', unit: 'success rate', status: 'normal' as const, icon: <Send className="h-6 w-6" /> },
    { title: 'Response Time', value: 0.0, unit: 'minutes avg', status: 'normal' as const, icon: <MessageCircle className="h-6 w-6" /> },
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
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Communications Center</h1>
            <p className="mt-2 text-muted-foreground">Broadcast alerts and coordinate messaging</p>
          </div>
        </div>

        {/* Alert */}
        <div className="mb-8">
          <AlertBanner
            type="info"
            title="System Status"
            message="No system broadcasts scheduled."
          />
        </div>

        {/* KPI Cards */}
        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {commStats.map((stat, idx) => (
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

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-3">
          
          {/* Message Board */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground">Communication Log</h2>
              <p className="mt-1 text-sm text-muted-foreground">Recent announcements and incidents</p>
            </div>

            <div className="rounded-xl border border-dashed border-border/40 bg-card/10 p-8 text-center text-xs text-muted-foreground flex flex-col items-center justify-center gap-2">
              <MessageCircle className="h-8 w-8 opacity-35" />
              <p className="font-bold">No recent announcements</p>
              <p className="opacity-75">No logs registered</p>
            </div>
          </div>

          {/* Broadcast Tools */}
          <div className="space-y-6">
            <div className="rounded-lg border border-border bg-card p-6 opacity-60">
              <h3 className="mb-4 font-bold text-foreground">Quick Broadcast</h3>
              <p className="text-xs text-muted-foreground">Broadcast server connection offline.</p>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-4 font-bold text-foreground">Broadcast Channels</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Digital Displays</span>
                  <span className="rounded-full bg-neutral-900 px-2 py-1 text-xs font-medium text-neutral-400">
                    Offline
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Mobile Alerts</span>
                  <span className="rounded-full bg-neutral-900 px-2 py-1 text-xs font-medium text-neutral-400">
                    Offline
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Message Templates */}
        <div className="mt-12 rounded-lg border border-border bg-card p-6">
          <h2 className="mb-6 text-2xl font-bold text-foreground">Message Templates</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Weather Alert', desc: 'Storm warning notification' },
              { title: 'Gate Diversion', desc: 'Redirect crowd message' },
              { title: 'Medical Alert', desc: 'Emergency medical update' },
            ].map((template, idx) => (
              <button
                key={idx}
                disabled
                className="rounded-lg border border-border bg-background p-4 text-left transition-all opacity-55 cursor-not-allowed"
              >
                <h3 className="font-semibold text-foreground">{template.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{template.desc}</p>
              </button>
            ))}
          </div>
        </div>

      </div>
    </main>
  )
}
