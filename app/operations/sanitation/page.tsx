'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Home, Droplets, Users, AlertTriangle, CheckCircle2, Clock,
  Activity, Zap, BarChart3, Wifi, WifiOff, AlertCircle, RefreshCw,
} from 'lucide-react'
import { OperationsService } from '../../../services/operations.service'
import { KPICard } from '@/components/ops/KPICard'
import { AlertBanner } from '@/components/ops/AlertBanner'

type StatusDot = 'green' | 'yellow' | 'red' | 'blue'

function StatusBadge({ status, label }: { status: 'operational' | 'warning' | 'critical' | 'cleaning' | 'closed'; label?: string }) {
  const cfg = {
    operational: 'bg-emerald-900/40 text-emerald-300 border-emerald-500/30',
    warning:     'bg-amber-900/40 text-amber-300 border-amber-500/30',
    critical:    'bg-red-900/40 text-red-300 border-red-500/30',
    cleaning:    'bg-blue-900/40 text-blue-300 border-blue-500/30',
    closed:      'bg-slate-700/40 text-slate-400 border-slate-500/30',
  }[status]
  const text = label ?? status.charAt(0).toUpperCase() + status.slice(1)
  return <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${cfg}`}>{text}</span>
}

function ProgressBar({ pct, color = 'bg-teal-500' }: { pct: number; color?: string }) {
  const clamp = Math.min(100, Math.max(0, pct))
  const barColor = clamp > 85 ? 'bg-red-500' : clamp > 65 ? 'bg-amber-500' : color
  return (
    <div className="h-2 w-full rounded-full bg-white/10">
      <div className={`h-full rounded-full transition-all duration-700 ${barColor}`} style={{ width: `${clamp}%` }} />
    </div>
  )
}

function GlassCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 transition-all hover:border-teal-500/30 hover:bg-white/8 hover:shadow-lg hover:shadow-teal-500/5 ${className}`}>
      {children}
    </div>
  )
}

function SectionTitle({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-foreground">{children}</h2>
      {sub && <p className="mt-1 text-sm text-muted-foreground">{sub}</p>}
    </div>
  )
}

function Stat({ label, value, sub, accent = 'text-foreground' }: { label: string; value: string | number; sub?: string; accent?: string }) {
  return (
    <div className="space-y-1">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`text-2xl font-bold ${accent}`}>{value}</p>
      {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
    </div>
  )
}

function Pulse({ color = 'bg-emerald-500' }: { color?: string }) {
  return (
    <span className="relative flex h-2.5 w-2.5">
      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 ${color}`} />
      <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${color}`} />
    </span>
  )
}

function MiniBarChart({ data, color = 'bg-teal-500' }: { data: number[]; color?: string }) {
  const max = Math.max(...data)
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-14 border border-dashed border-white/5 rounded text-[10px] text-muted-foreground">
        No data
      </div>
    )
  }
  return (
    <div className="flex items-end gap-1 h-14">
      {data.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col justify-end">
          <div
            className={`rounded-sm ${color} opacity-80 transition-all`}
            style={{ height: `${(v / max) * 100}%` }}
          />
        </div>
      ))}
    </div>
  )
}

export default function SanitationPage() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<any>(null)
  const [alerts, setAlerts] = useState<any[]>([])
  const [cleaningTeams, setCleaningTeams] = useState<any[]>([])
  const [supplies, setSupplies] = useState<any[]>([])
  const [sewageSensors, setSewageSensors] = useState<any[]>([])
  const [waterZones, setWaterZones] = useState<any[]>([])
  const [aiPredictions, setAiPredictions] = useState<any[]>([])
  const [roles, setRoles] = useState<any[]>([])
  const [mapZones, setMapZones] = useState<any[]>([])

  useEffect(() => {
    const loadData = async () => {
      try {
        const [
          statsData,
          alertsData,
          teamsData,
          suppliesData,
          sewageData,
          waterData,
          predictionsData,
          rolesData,
          mapData,
        ] = await Promise.all([
          OperationsService.getSanitationStats(),
          OperationsService.getSanitationAlerts(),
          OperationsService.getCleaningTeams(),
          OperationsService.getHygieneSupplies(),
          OperationsService.getSewageSensors(),
          OperationsService.getWaterZones(),
          OperationsService.getAiPredictions(),
          OperationsService.getSanitationRoles(),
          OperationsService.getSanitationMapZones(),
        ])
        setStats(statsData)
        setAlerts(alertsData)
        setCleaningTeams(teamsData)
        setSupplies(suppliesData)
        setSewageSensors(sewageData)
        setWaterZones(waterData)
        setAiPredictions(predictionsData)
        setRoles(rolesData)
        setMapZones(mapData)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const kpiStats = [
    { title: 'Total Washrooms',       value: 0,    unit: 'units',    icon: <Droplets className="h-6 w-6" />, status: 'normal' as const },
    { title: "Men's Washrooms",        value: 0,    unit: 'blocks',   icon: <Users className="h-6 w-6" />,    status: 'normal' as const },
    { title: "Women's Washrooms",      value: 0,    unit: 'blocks',   icon: <Users className="h-6 w-6" />,    status: 'normal' as const },
    { title: 'Accessible Units',       value: 0,    unit: 'units',    icon: <CheckCircle2 className="h-6 w-6" />, status: 'normal' as const },
    { title: 'Currently Occupied',     value: stats ? stats.occupancy : 0, unit: 'people', icon: <Activity className="h-6 w-6" />, status: 'normal' as const },
    { title: 'Cleaning Teams Active',  value: 0,     unit: 'teams',   icon: <RefreshCw className="h-6 w-6" />, status: 'normal' as const },
    { title: 'Open Maintenance',       value: 0,     unit: 'tickets', icon: <AlertCircle className="h-6 w-6" />, status: 'normal' as const },
    { title: 'Avg Queue Time',         value: '--',  unit: 'min',     icon: <Clock className="h-6 w-6" />,    status: 'normal' as const },
    { title: 'Water Consumption',      value: '0',   unit: 'kL/hr',   icon: <Droplets className="h-6 w-6" />, status: 'normal' as const },
    { title: 'Sewage Health',          value: '--',  unit: 'score',   icon: <Zap className="h-6 w-6" />,      status: 'normal' as const },
    { title: 'Family Washrooms',       value: 0,     unit: 'units',   icon: <CheckCircle2 className="h-6 w-6" />, status: 'normal' as const },
    { title: 'Available Capacity',     value: '0%',  unit: 'free',    icon: <BarChart3 className="h-6 w-6" />, status: 'normal' as const },
  ]

  if (loading) {
    return (
      <main className="min-h-screen bg-background py-12 sm:py-16 animate-pulse">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="h-32 bg-card/50 rounded-xl" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="h-24 bg-card/50 rounded-xl" />
            ))}
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10">
          <Link href="/operations" className="mb-4 inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            <Home className="h-4 w-4" />
            <span className="text-sm">Back to Operations</span>
          </Link>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 shadow-lg shadow-teal-500/25">
              <Droplets className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Smart Sanitation Operations</h1>
              <p className="mt-1 text-muted-foreground">Real-time monitoring of washrooms, hygiene systems, sewage infrastructure, cleaning operations & water management</p>
            </div>
          </div>
        </div>

        {/* Alert Banner */}
        <div className="mb-8 space-y-3">
          <AlertBanner type="info" title="Sanitation Telemetry System" message="System initialized. Waiting for live telemetry feeds." />
        </div>

        {/* KPI Grid */}
        <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
          {kpiStats.map((s, i) => (
            <KPICard key={i} title={s.title} value={s.value} unit={s.unit}
              icon={s.icon} status={s.status} />
          ))}
        </div>

        {/* Washroom Monitors */}
        <SectionTitle sub="Live per-gender occupancy and queue metrics">Washroom Monitors</SectionTitle>
        <div className="mb-12 grid gap-6 lg:grid-cols-2">

          {/* Men's */}
          <GlassCard>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-blue-900/40 flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Men's Washroom Monitor</h3>
                  <p className="text-xs text-muted-foreground">0 blocks connected</p>
                </div>
              </div>
              <StatusBadge status="operational" label="No occupancy" />
            </div>

            <div className="grid grid-cols-4 gap-4 mb-5">
              <Stat label="Occupied"  value={0} />
              <Stat label="Capacity"  value={0} />
              <Stat label="Entered"   value="0" />
              <Stat label="Exited"    value="0" />
            </div>
            <div className="grid grid-cols-3 gap-4 mb-5">
              <Stat label="Queue"     value={0}         sub="people waiting" />
              <Stat label="Avg Wait"  value="0.0 min"  />
              <Stat label="Usage"     value="0%" accent="text-teal-400" />
            </div>

            <ProgressBar pct={0} color="bg-blue-500" />
            <p className="text-right text-xs text-muted-foreground mt-1">0% occupied</p>

            <div className="mt-4">
              <p className="text-xs text-muted-foreground mb-2">Hourly traffic today</p>
              <MiniBarChart data={[]} color="bg-blue-500" />
            </div>
          </GlassCard>

          {/* Women's */}
          <GlassCard>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-pink-900/40 flex items-center justify-center">
                  <Users className="h-5 w-5 text-pink-400" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Women's Washroom Monitor</h3>
                  <p className="text-xs text-muted-foreground">0 blocks connected</p>
                </div>
              </div>
              <StatusBadge status="operational" label="No occupancy" />
            </div>

            <div className="grid grid-cols-4 gap-4 mb-5">
              <Stat label="Occupied"  value={0} />
              <Stat label="Capacity"  value={0} />
              <Stat label="Entered"   value="0" />
              <Stat label="Exited"    value="0" />
            </div>
            <div className="grid grid-cols-3 gap-4 mb-5">
              <Stat label="Queue"     value={0}         sub="people waiting" />
              <Stat label="Avg Wait"  value="0.0 min"  />
              <Stat label="Usage"     value="0%" accent="text-teal-400" />
            </div>

            <ProgressBar pct={0} color="bg-pink-500" />
            <p className="text-right text-xs text-muted-foreground mt-1">0% occupied</p>

            <div className="mt-4">
              <p className="text-xs text-muted-foreground mb-2">Hourly traffic today</p>
              <MiniBarChart data={[]} color="bg-pink-500" />
            </div>
          </GlassCard>
        </div>

        {/* Accessible & Family */}
        <SectionTitle sub="Occupancy, cleaning status and emergency calls">Accessible & Family Facilities</SectionTitle>
        <div className="mb-12 rounded-xl border border-dashed border-border/40 bg-card/10 p-8 text-center text-xs text-muted-foreground">
          Waiting for telemetry connection to accessible and family blocks.
        </div>

        {/* Smart Cleaning Panel */}
        <SectionTitle sub="Live cleaning team status and schedules">Smart Cleaning Panel</SectionTitle>
        <div className="mb-12 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <RefreshCw className="h-5 w-5 text-teal-400" />
              <span className="font-semibold text-foreground">0 Teams Active · Avg Score 0 / 100</span>
            </div>
          </div>
          {cleaningTeams.length > 0 ? (
            <div className="overflow-x-auto">
              {/* Teams mapped dynamically */}
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-muted-foreground border-t border-white/5">
              No cleaning assignments active
            </div>
          )}
        </div>

        {/* Hygiene Supplies */}
        <SectionTitle sub="Inventory levels with auto-refill status">Hygiene Supplies Monitor</SectionTitle>
        {supplies.length > 0 ? (
          <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Supplies mapped dynamically */}
          </div>
        ) : (
          <div className="mb-12 rounded-xl border border-dashed border-border/40 bg-card/10 p-8 text-center text-xs text-muted-foreground">
            No supplies tracked
          </div>
        )}

        {/* Sewage & Wastewater */}
        <SectionTitle sub="Smart sewage monitoring, pump health and overflow risk">Smart Sewage & Wastewater Monitoring</SectionTitle>
        {sewageSensors.length > 0 ? (
          <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {/* Sewage mapped dynamically */}
          </div>
        ) : (
          <div className="mb-12 rounded-xl border border-dashed border-border/40 bg-card/10 p-8 text-center text-xs text-muted-foreground">
            No sewage sensors online
          </div>
        )}

        {/* Smart Water Management */}
        <SectionTitle sub="Fresh & grey water tanks, zone consumption and leak detection">Smart Water Management</SectionTitle>
        <div className="mb-12 grid gap-6 lg:grid-cols-3">
          {/* Tank Overview */}
          <GlassCard>
            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2"><Droplets className="h-5 w-5 text-teal-400" /> Tank Status</h3>
            <div className="space-y-4">
              {[
                { label: 'Fresh Water Tank',  pct: 0, color: 'bg-cyan-500'  },
                { label: 'Grey Water Tank',   pct: 0, color: 'bg-slate-500' },
                { label: 'Recycled Water',    pct: 0, color: 'bg-teal-500'  },
              ].map((t, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-muted-foreground">{t.label}</span>
                    <span className="font-semibold text-foreground">{t.pct}%</span>
                  </div>
                  <ProgressBar pct={t.pct} color={t.color} />
                </div>
              ))}
              <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-3 text-sm">
                <div><p className="text-xs text-muted-foreground">Water Pressure</p><p className="font-bold text-foreground">0.0 bar</p></div>
                <div><p className="text-xs text-muted-foreground">Leak Detection</p><p className="font-bold text-emerald-400">None</p></div>
                <div><p className="text-xs text-muted-foreground">Water Quality</p><p className="font-bold text-neutral-400">--</p></div>
                <div><p className="text-xs text-muted-foreground">Consumption</p><p className="font-bold text-foreground">0.0 kL/hr</p></div>
              </div>
            </div>
          </GlassCard>

          {/* Zone Consumption */}
          <div className="lg:col-span-2 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden flex flex-col justify-center items-center p-8">
            <p className="text-xs text-muted-foreground">No water telemetry zones detected</p>
          </div>
        </div>

        {/* Live Stadium Map */}
        <SectionTitle sub="Colour-coded live status for every washroom block across the stadium">Live Stadium Washroom Map</SectionTitle>
        <GlassCard className="mb-12">
          <div className="flex flex-col items-center justify-center p-12 border border-dashed border-white/5 rounded-xl text-center text-xs text-muted-foreground">
            Map data unavailable
          </div>
        </GlassCard>

        {/* Real-time Alerts */}
        <SectionTitle sub="Live system notifications requiring attention">Real-Time Alerts</SectionTitle>
        <div className="mb-12 rounded-xl border border-dashed border-border/40 bg-card/10 p-8 text-center text-xs text-muted-foreground">
          No active washroom alerts
        </div>

        {/* AI Predictions */}
        <SectionTitle sub="Machine-learning insights and operational forecasts">AI Predictions & Forecasts</SectionTitle>
        <div className="mb-12 rounded-xl border border-dashed border-border/40 bg-card/10 p-8 text-center text-xs text-muted-foreground">
          No AI predictions generated
        </div>

        {/* Role Permissions */}
        <SectionTitle sub="Access control by role for sanitation systems">Role Permissions Matrix</SectionTitle>
        <div className="mb-12 rounded-xl border border-dashed border-border/40 bg-card/10 p-8 text-center text-xs text-muted-foreground">
          No sanitation roles active
        </div>

        {/* Quick Actions */}
        <GlassCard>
          <h3 className="font-bold text-foreground mb-4">Quick Actions</h3>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            <button disabled className="rounded-lg border border-neutral-850 bg-neutral-900/30 px-4 py-2 text-xs font-semibold text-neutral-450 cursor-not-allowed opacity-55">
              Dispatch Cleaning Team
            </button>
            <button disabled className="rounded-lg border border-neutral-850 bg-neutral-900/30 px-4 py-2 text-xs font-semibold text-neutral-450 cursor-not-allowed opacity-55">
              Urgent Supply Refill
            </button>
            <button disabled className="rounded-lg border border-neutral-850 bg-neutral-900/30 px-4 py-2 text-xs font-semibold text-neutral-450 cursor-not-allowed opacity-55">
              Open Maintenance Ticket
            </button>
            <button disabled className="rounded-lg bg-neutral-900 px-4 py-2 text-xs font-semibold text-neutral-450 cursor-not-allowed opacity-55">
              Emergency Protocol
            </button>
          </div>
        </GlassCard>

      </div>
    </main>
  )
}
