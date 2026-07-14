'use client'

import Link from 'next/link'
import { 
  ParkingCircle, 
  Bus, 
  Zap, 
  Droplets, 
  Trash2, 
  Leaf, 
  Package, 
  Wrench,
  Users,
  Shield,
  Activity,
  Settings,
  Building2,
  HelpCircle,
  FileText,
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const modules = [
  { title: 'Smart Parking', href: '/infrastructure/parking', icon: ParkingCircle, description: 'Real-time parking management and availability' },
  { title: 'Transportation Hub', href: '/infrastructure/transportation', icon: Bus, description: 'Multi-modal transport coordination' },
  { title: 'Energy Management', href: '/infrastructure/energy', icon: Zap, description: 'Smart energy distribution and monitoring' },
  { title: 'Water Management', href: '/infrastructure/water', icon: Droplets, description: 'Water consumption tracking' },
  { title: 'Waste Management', href: '/infrastructure/waste', icon: Trash2, description: 'Collection and recycling tracking' },
  { title: 'Sustainability', href: '/infrastructure/sustainability', icon: Leaf, description: 'Environmental impact dashboard' },
  { title: 'Asset Management', href: '/infrastructure/assets', icon: Package, description: 'Equipment inventory and lifecycle' },
  { title: 'Maintenance', href: '/infrastructure/maintenance', icon: Wrench, description: 'Scheduled maintenance and repairs' },
  { title: 'User Management', href: '/infrastructure/users', icon: Users, description: 'User administration and access' },
  { title: 'RBAC', href: '/infrastructure/rbac', icon: Shield, description: 'Role-based access control' },
  { title: 'Audit Logs', href: '/infrastructure/audit', icon: Activity, description: 'Security and activity tracking' },
  { title: 'System Settings', href: '/infrastructure/settings', icon: Settings, description: 'System configuration' },
  { title: 'Organizations', href: '/infrastructure/organizations', icon: Building2, description: 'Department and team management' },
  { title: 'Help Center', href: '/infrastructure/help', icon: HelpCircle, description: 'Documentation and support' },
  { title: 'Reports', href: '/infrastructure/reports', icon: FileText, description: 'Report generation and analytics' },
]

export default function InfrastructurePage() {
  return (
    <main className="min-h-screen bg-background py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Infrastructure Management Portal
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Complete stadium infrastructure control, from parking and energy to maintenance and sustainability
          </p>
        </div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {modules.map((module) => {
            const Icon = module.icon
            return (
              <Link
                key={module.href}
                href={module.href}
                className="group rounded-lg border border-border bg-card hover:border-primary hover:shadow-md transition-all p-6 text-card-foreground"
              >
                <div className="flex items-start justify-between mb-3">
                  <Icon className="h-8 w-8 text-primary opacity-75 group-hover:opacity-100 transition-opacity" />
                  <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  {module.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-2">{module.description}</p>
              </Link>
            )
          })}
        </div>

        {/* Categories Overview */}
        <div className="bg-card border border-border rounded-lg p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Platform Capabilities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-foreground mb-3">Infrastructure</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>Smart Parking Management</li>
                <li>Transportation Coordination</li>
                <li>Energy & Water Management</li>
                <li>Waste & Sustainability</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-3">Operations</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>Asset Management</li>
                <li>Maintenance Scheduling</li>
                <li>Equipment Lifecycle</li>
                <li>Preventive Services</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-3">Administration</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>User Management</li>
                <li>Role-Based Access</li>
                <li>Audit & Compliance</li>
                <li>Reports & Analytics</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
