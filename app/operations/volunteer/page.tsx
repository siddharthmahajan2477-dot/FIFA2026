'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Clock, Users, CheckCircle2, AlertCircle, Home, Info } from 'lucide-react'
import { useAuth } from '../../../hooks/useAuth'
import { OperationsService } from '../../../services/operations.service'
import { Volunteer } from '../../../types/operations'
import { KPICard } from '@/components/ops/KPICard'
import { AlertBanner } from '@/components/ops/AlertBanner'

export default function VolunteerPage() {
  const { user, loading: authLoading } = useAuth()
  const [tasks, setTasks] = useState<Volunteer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await OperationsService.getVolunteers()
        setTasks(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const volunteerStats = [
    { title: 'Active Volunteers', value: 0, unit: 'people', trend: 'stable' as const, trendPercent: 0, icon: <Users className="h-6 w-6" /> },
    { title: 'Check-ins Today', value: 0, unit: 'completed', trend: 'stable' as const, trendPercent: 0, icon: <CheckCircle2 className="h-6 w-6" /> },
    { title: 'Tasks Assigned', value: 0, unit: 'active', trend: 'stable' as const, trendPercent: 0, icon: <Clock className="h-6 w-6" /> },
    { title: 'Issues Reported', value: 0, unit: 'pending', status: 'warning' as const, icon: <AlertCircle className="h-6 w-6" /> },
  ]

  const isLoading = authLoading || loading

  if (isLoading) {
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
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Volunteer Dashboard</h1>
            <p className="mt-2 text-muted-foreground">Check your tasks, status, and volunteer assignments</p>
          </div>
        </div>

        {/* Alerts */}
        <div className="mb-8 space-y-3">
          <AlertBanner
            type="info"
            title="Stadium Event Update"
            message="No system-wide announcements or event updates active."
          />
        </div>

        {/* KPI Cards */}
        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {volunteerStats.map((stat, idx) => (
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
          
          {/* My Tasks */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground">My Tasks</h2>
              <p className="mt-1 text-sm text-muted-foreground">Your assigned tasks and responsibilities</p>
            </div>

            {tasks.length > 0 ? (
              <div className="space-y-4">
                {/* Dynamically mapped tasks if loaded in future */}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-border/40 bg-card/10 p-8 text-center text-xs text-muted-foreground flex flex-col items-center justify-center gap-2">
                <AlertCircle className="h-8 w-8 opacity-35 animate-pulse" />
                <p className="font-bold">No tasks assigned</p>
                <p className="opacity-75">Waiting for operations leader dispatch</p>
              </div>
            )}
          </div>

          {/* Volunteer Info Card */}
          <div className="space-y-6">
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-4 font-bold text-foreground">Your Profile</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Name</p>
                  <p className="font-medium text-foreground">{user ? user.name : 'Guest Session'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Shift</p>
                  <p className="font-medium text-foreground">No shift assigned</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Area Assignment</p>
                  <p className="font-medium text-foreground">Not assigned</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Team Lead</p>
                  <p className="font-medium text-foreground">None</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-4 font-bold text-foreground">Shift Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Check-in Status</span>
                  <span className="rounded-full bg-neutral-900 px-2 py-1 text-xs font-medium text-neutral-400">
                    Not Checked In
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Shift Start</span>
                  <span className="font-medium text-foreground">--:--</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Hours Logged</span>
                  <span className="font-medium text-foreground">0h 0m</span>
                </div>
              </div>
            </div>

            <button disabled className="w-full rounded-lg bg-neutral-900 px-4 py-2 font-semibold text-neutral-450 cursor-not-allowed opacity-50">
              Request Time Off
            </button>
          </div>

        </div>

        {/* Recent Activity */}
        <div className="mt-12 rounded-lg border border-border bg-card p-6">
          <h2 className="mb-6 text-2xl font-bold text-foreground">Recent Activity</h2>
          <div className="rounded-xl border border-dashed border-border/40 bg-card/10 p-8 text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
            <Info className="h-4 w-4" />
            <span>No recent activity logged</span>
          </div>
        </div>

      </div>
    </main>
  )
}
