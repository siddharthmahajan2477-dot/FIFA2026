'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Shield, AlertTriangle, Users, MapPin, Home } from 'lucide-react'
import { OperationsService } from '../../../services/operations.service'
import { SecurityIncident } from '../../../types/operations'
import { KPICard } from '@/components/ops/KPICard'
import { StaffTable } from '@/components/ops/StaffTable'
import { AlertBanner } from '@/components/ops/AlertBanner'

export default function SecurityPage() {
  const [incidents, setIncidents] = useState<SecurityIncident[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await OperationsService.getSecurityIncidents()
        setIncidents(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  const securityStats = [
    { title: 'Active Personnel', value: 0, unit: 'officers', trend: 'stable' as const, trendPercent: 0, icon: <Users className="h-6 w-6" /> },
    { title: 'Incidents Today', value: 0, unit: 'resolved', status: 'normal' as const, icon: <AlertTriangle className="h-6 w-6" /> },
    { title: 'Checkpoints', value: 0, unit: 'operational', status: 'normal' as const, icon: <MapPin className="h-6 w-6" /> },
    { title: 'Threat Level', value: 'Low', unit: 'risk', status: 'normal' as const, icon: <Shield className="h-6 w-6" /> },
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

  const activeAlert = incidents.find((i) => i.status === 'active' && i.severity === 'high')

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
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Security Operations</h1>
            <p className="mt-2 text-muted-foreground">Monitor security incidents and personnel</p>
          </div>
        </div>

        {/* Critical Alert */}
        {activeAlert && (
          <div className="mb-8">
            <AlertBanner
              type="warning"
              title="Active Incident"
              message={`${activeAlert.title} at ${activeAlert.location}. Unit dispatched.`}
            />
          </div>
        )}

        {/* KPI Cards */}
        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {securityStats.map((stat, idx) => (
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
          
          {/* Incidents */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground">Active Incidents</h2>
              <p className="mt-1 text-sm text-muted-foreground">Security incidents requiring attention</p>
            </div>

            {incidents.length > 0 ? (
              <div className="space-y-4">
                {/* Incidents mapped dynamically */}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-border/40 bg-card/10 p-8 text-center text-xs text-muted-foreground flex flex-col items-center justify-center gap-2">
                <Shield className="h-8 w-8 opacity-35" />
                <p className="font-bold">No active security incidents</p>
                <p className="opacity-75">Stadium parameters secure</p>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-4 font-bold text-foreground">Quick Actions</h3>
              <div className="space-y-2">
                <button disabled className="w-full rounded-lg border border-border bg-neutral-900 px-4 py-2 text-xs font-semibold text-neutral-450 cursor-not-allowed opacity-50">
                  Report Incident
                </button>
                <button disabled className="w-full rounded-lg border border-border bg-neutral-900 px-4 py-2 text-xs font-semibold text-neutral-450 cursor-not-allowed opacity-50">
                  Deploy Unit
                </button>
                <button disabled className="w-full rounded-lg border border-border bg-neutral-900 px-4 py-2 text-xs font-semibold text-neutral-450 cursor-not-allowed opacity-50">
                  Send Announcement
                </button>
                <button disabled className="w-full rounded-lg bg-neutral-900 px-4 py-2 text-xs font-semibold text-neutral-450 cursor-not-allowed opacity-50">
                  Emergency Alert
                </button>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-4 font-bold text-foreground">Threat Level</h3>
              <div className="rounded-lg bg-green-100 dark:bg-green-900/30 px-4 py-3 text-center border border-green-200/20">
                <p className="text-sm text-green-700 dark:text-green-300 mb-1">Current Level</p>
                <p className="text-2xl font-bold text-green-700 dark:text-green-300">LOW</p>
              </div>
            </div>
          </div>
        </div>

        {/* Personnel */}
        <div className="mt-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground">Security Personnel</h2>
            <p className="mt-1 text-sm text-muted-foreground">Real-time status of all security staff</p>
          </div>
          <StaffTable staff={[]} />
        </div>

      </div>
    </main>
  )
}
