'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import {
  Users,
  Shield,
  Heart,
  Settings,
  BarChart3,
  Lock,
  Home,
  ArrowRight,
  Droplets,
  Map,
} from 'lucide-react'

// ── Dynamic import — Leaflet must be client-only ────────────────────────────
const OperationsMap = dynamic(() => import('@/components/maps/OperationsMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full flex items-center justify-center rounded-xl bg-card/50 border border-border" style={{ height: 480 }}>
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-sm text-muted-foreground">Loading Operations Map…</p>
      </div>
    </div>
  ),
})

export default function OperationsPage() {
  const roles = [
    {
      title: 'Volunteer',
      description: 'Task management and attendance tracking',
      href: '/operations/volunteer',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      access: 'Full access to task assignments and schedules',
    },
    {
      title: 'Security Manager',
      description: 'Security operations and incident response',
      href: '/operations/security',
      icon: Shield,
      color: 'from-red-500 to-red-600',
      access: 'Monitor security incidents and personnel',
    },
    {
      title: 'Medical Officer',
      description: 'Medical emergency response coordination',
      href: '/operations/medical',
      icon: Heart,
      color: 'from-pink-500 to-pink-600',
      access: 'Manage medical incidents and resources',
    },
    {
      title: 'Operations Manager',
      description: 'Crowd control and facility management',
      href: '/operations/crowd-management',
      icon: Settings,
      color: 'from-purple-500 to-purple-600',
      access: 'Monitor crowd flow and gate operations',
    },
    {
      title: 'Communications',
      description: 'Broadcast messages and notifications',
      href: '/operations/communications',
      icon: BarChart3,
      color: 'from-orange-500 to-orange-600',
      access: 'Send alerts and coordinate messaging',
    },
    {
      title: 'Executive',
      description: 'Real-time dashboards and reports',
      href: '/operations/executive',
      icon: Lock,
      color: 'from-indigo-500 to-indigo-600',
      access: 'Strategic overview and analytics',
    },
    {
      title: 'Smart Sanitation Manager',
      description: 'Washrooms, sewage, water management & hygiene operations',
      href: '/operations/sanitation',
      icon: Droplets,
      color: 'from-teal-500 to-cyan-600',
      access: 'Monitor sanitation systems and cleaning teams',
    },
  ]

  return (
    <main className="min-h-screen bg-background py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <Link href="/" className="mb-6 inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <Home className="h-4 w-4" />
            <span className="text-sm">Back to Home</span>
          </Link>
          <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
            Stadium Operations
            <span className="block text-primary">Role Selection</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
            Select your role to access the operations dashboard and manage your responsibilities
          </p>
        </div>

        {/* Role Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {roles.map((role) => {
            const Icon = role.icon
            return (
              <Link
                key={role.href}
                href={role.href}
                className="group rounded-lg border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-lg"
              >
                <div className={`mb-4 inline-flex rounded-lg bg-gradient-to-br ${role.color} p-3 text-white`}>
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mb-2 text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  {role.title}
                </h3>

                <p className="mb-4 text-sm text-muted-foreground">{role.description}</p>

                <div className="mb-4 rounded-md bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
                  {role.access}
                </div>

                <div className="flex items-center gap-2 text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Access Dashboard
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            )
          })}
        </div>

        {/* ── Operations Live Map ── */}
        <div className="mt-16">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Map className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Operations Command Map</h2>
              <p className="text-sm text-muted-foreground">Live positions of all field teams — powered by OpenStreetMap</p>
            </div>
            <div className="ml-auto flex items-center gap-2 rounded-full bg-green-500/10 border border-green-500/20 px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-semibold text-green-400">Live</span>
            </div>
          </div>

          <OperationsMap />
        </div>

        {/* Info Section */}
        <div className="mt-16 rounded-lg border border-border bg-card p-8">
          <h2 className="mb-4 text-2xl font-bold text-foreground">About Operations Portal</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Real-time Monitoring', description: 'Live updates on stadium operations and incident status' },
              { title: 'Task Management', description: 'Assign and track tasks across teams' },
              { title: 'Incident Tracking', description: 'Report and monitor security and medical incidents' },
              { title: 'Resource Coordination', description: 'Manage staff and resource allocation' },
              { title: 'Communication', description: 'Send alerts and coordinate with teams' },
              { title: 'Analytics', description: 'Track KPIs and generate reports' },
            ].map((info, idx) => (
              <div key={idx}>
                <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                <p className="text-sm text-muted-foreground">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
