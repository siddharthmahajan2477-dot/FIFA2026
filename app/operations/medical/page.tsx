'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Heart, AlertCircle, Users, Ambulance, Home } from 'lucide-react'
import { OperationsService } from '../../../services/operations.service'
import { MedicalIncident } from '../../../types/operations'
import { KPICard } from '@/components/ops/KPICard'
import { StaffTable } from '@/components/ops/StaffTable'
import { AlertBanner } from '@/components/ops/AlertBanner'

export default function MedicalPage() {
  const [incidents, setIncidents] = useState<MedicalIncident[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await OperationsService.getMedicalIncidents()
        setIncidents(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  const medicalStats = [
    { title: 'Medical Staff', value: 0, unit: 'personnel', status: 'normal' as const, icon: <Heart className="h-6 w-6" /> },
    { title: 'Cases Today', value: 0, unit: 'patients', trend: 'stable' as const, trendPercent: 0, icon: <AlertCircle className="h-6 w-6" /> },
    { title: 'Available Beds', value: 0, unit: 'of 0', status: 'normal' as const, icon: <Users className="h-6 w-6" /> },
    { title: 'Ambulances', value: 0, unit: 'deployed', status: 'normal' as const, icon: <Ambulance className="h-6 w-6" /> },
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

  const activeAlert = incidents.find((i) => i.status === 'active' && i.severity === 'critical')

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
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Medical Operations</h1>
            <p className="mt-2 text-muted-foreground">Emergency response and medical incident management</p>
          </div>
        </div>

        {/* Critical Alert */}
        {activeAlert && (
          <div className="mb-8">
            <AlertBanner
              type="critical"
              title="Critical Medical Alert"
              message={`${activeAlert.title} in ${activeAlert.location}. Assigned: ${activeAlert.assignedTo}`}
            />
          </div>
        )}

        {/* KPI Cards */}
        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {medicalStats.map((stat, idx) => (
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
          
          {/* Medical Cases */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground">Medical Cases</h2>
              <p className="mt-1 text-sm text-muted-foreground">Active and recent medical incidents</p>
            </div>

            {incidents.length > 0 ? (
              <div className="space-y-4">
                {/* Cases mapped dynamically */}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-border/40 bg-card/10 p-8 text-center text-xs text-muted-foreground flex flex-col items-center justify-center gap-2">
                <AlertCircle className="h-8 w-8 opacity-35" />
                <p className="font-bold">No active medical incidents</p>
                <p className="opacity-75">All stations clear</p>
              </div>
            )}
          </div>

          {/* Quick Actions & Resources */}
          <div className="space-y-6">
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-4 font-bold text-foreground">Emergency Response</h3>
              <div className="space-y-2">
                <button disabled className="w-full rounded-lg border border-border bg-neutral-900 px-4 py-2 text-xs font-semibold text-neutral-450 cursor-not-allowed opacity-50">
                  Call Ambulance
                </button>
                <button disabled className="w-full rounded-lg border border-border bg-neutral-900 px-4 py-2 text-xs font-semibold text-neutral-450 cursor-not-allowed opacity-50">
                  Activate AED
                </button>
                <button disabled className="w-full rounded-lg border border-border bg-neutral-900 px-4 py-2 text-xs font-semibold text-neutral-450 cursor-not-allowed opacity-50">
                  Medical Support
                </button>
                <button disabled className="w-full rounded-lg bg-neutral-900 px-4 py-2 text-xs font-semibold text-neutral-450 cursor-not-allowed opacity-50">
                  Emergency Protocol
                </button>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-4 font-bold text-foreground">Resources</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">First Aid Kits</span>
                  <span className="font-medium text-foreground">0 / 0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Oxygen Tanks</span>
                  <span className="font-medium text-foreground">0 / 0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Stretchers</span>
                  <span className="font-medium text-foreground">0 / 0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">AED Units</span>
                  <span className="font-medium text-foreground">0 / 0</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Personnel */}
        <div className="mt-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground">Medical Personnel</h2>
            <p className="mt-1 text-sm text-muted-foreground">Real-time status of medical staff</p>
          </div>
          <StaffTable staff={[]} />
        </div>

      </div>
    </main>
  )
}
