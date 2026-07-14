'use client'

import Link from 'next/link'
import { 
  BarChart3, 
  Users, 
  Trophy, 
  Ticket, 
  MapPin, 
  Utensils, 
  ShoppingBag, 
  User,
  ArrowRight,
  Settings,
  Brain,
  Zap
} from 'lucide-react'

export default function Page() {
  const modules = [
    {
      title: 'Fan Dashboard',
      description: 'Your personalized World Cup experience with live matches, tickets, and weather',
      href: '/fan-dashboard',
      icon: BarChart3,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Match Center',
      description: 'Live match statistics, player ratings, and real-time event tracking',
      href: '/match-center',
      icon: Trophy,
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Team Analytics',
      description: 'Comprehensive team statistics, standings, and performance metrics',
      href: '/team-analytics',
      icon: BarChart3,
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Player Analytics',
      description: 'Individual player statistics, form ratings, and head-to-head comparisons',
      href: '/player-analytics',
      icon: Users,
      color: 'from-orange-500 to-orange-600',
    },
    {
      title: 'Tournament Center',
      description: 'Groups, standings, knockout bracket, and tournament awards',
      href: '/tournament-center',
      icon: Trophy,
      color: 'from-red-500 to-red-600',
    },
    {
      title: 'Tickets',
      description: 'Manage your tickets, view seat information, and purchase new ones',
      href: '/tickets',
      icon: Ticket,
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      title: 'Stadium Navigation',
      description: 'Find facilities, restrooms, food courts, medical centers, and emergency exits',
      href: '/stadium-navigation',
      icon: MapPin,
      color: 'from-pink-500 to-pink-600',
    },
    {
      title: 'Food & Beverage',
      description: 'Browse menus, check queue times, and order food and drinks',
      href: '/food-beverage',
      icon: Utensils,
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      title: 'Merchandise',
      description: 'Official jerseys, accessories, and collectible souvenirs',
      href: '/merchandise',
      icon: ShoppingBag,
      color: 'from-cyan-500 to-cyan-600',
    },
    {
      title: 'Fan Profile',
      description: 'Your profile, preferences, badges, and account settings',
      href: '/fan-profile',
      icon: User,
      color: 'from-teal-500 to-teal-600',
    },
  ]

  return (
    <main className="min-h-screen bg-background py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-16 text-center rounded-2xl p-8 sm:p-12 hero-glass-container shadow-lg">
          <h1 className="text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl">
            FIFA World Cup 2026
            <span className="block bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent pb-2">
              Smart Stadium Operating System
            </span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
            Your complete fan experience platform. Discover matches, track statistics, manage tickets, and enjoy the tournament.
          </p>
          <div className="mt-8 flex gap-4 justify-center flex-wrap">
            <Link
              href="/fan-dashboard"
              className="rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:scale-105"
            >
              Get Started
            </Link>
            <a
              href="#modules"
              className="rounded-lg border border-border px-8 py-3 font-semibold text-foreground transition-all hover:bg-muted hover:shadow-md"
            >
              Explore All Modules
            </a>
          </div>
        </div>

        {/* Featured Module */}
        <div className="mb-16 rounded-lg border border-border bg-card p-8 text-card-foreground shadow-lg transition-all hover:shadow-xl hover:border-primary/50">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Start Your Journey</h2>
              <p className="mb-6 text-lg text-muted-foreground">
                Welcome to the FIFA World Cup 2026 Smart Stadium Operating System. Access your personalized fan dashboard 
                to track live matches, manage your tickets, explore stadium facilities, and connect with the global football community.
              </p>
              <Link
                href="/fan-dashboard"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90"
              >
                Open Fan Dashboard
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
            <div className="rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 p-12 text-center">
              <div className="text-6xl">⚽</div>
              <p className="mt-4 text-muted-foreground">Live Match Experience</p>
            </div>
          </div>
        </div>

        {/* All Modules Grid */}
        <section id="modules">
          <h2 className="mb-12 text-3xl font-bold text-foreground">Explore All Modules</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((module) => {
              const Icon = module.icon
              return (
                <Link
                  key={module.href}
                  href={module.href}
                  className="group rounded-lg border border-border bg-card p-6 text-card-foreground transition-all hover:border-primary hover:shadow-md"
                >
                  <div className={`mb-4 inline-flex rounded-lg bg-gradient-to-br ${module.color} p-3 text-white`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-foreground group-hover:text-primary">{module.title}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">{module.description}</p>
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary opacity-0 transition-all group-hover:opacity-100">
                    Explore
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Infrastructure Section */}
        <section className="mt-16 mb-16">
          <div className="rounded-lg border border-border bg-card p-8 text-card-foreground">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-4">Infrastructure Management</h2>
                <p className="mb-6 text-lg text-muted-foreground">
                  Complete control over stadium infrastructure including smart parking, transportation, energy, water, waste management, sustainability, asset lifecycle, and maintenance operations with full audit and compliance tracking.
                </p>
                <Link
                  href="/infrastructure"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90"
                >
                  Access Infrastructure Portal
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
              <div className="rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 p-12 text-center">
                <Zap className="mx-auto h-12 w-12 text-primary mb-4" />
                <p className="text-muted-foreground">Smart Infrastructure Control</p>
              </div>
            </div>
          </div>
        </section>

        {/* AI Intelligence Section */}
        <section className="mt-16 mb-16">
          <div className="rounded-lg border border-border bg-card p-8 text-card-foreground">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div className="rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 p-12 text-center">
                <Brain className="mx-auto h-12 w-12 text-primary mb-4" />
                <p className="text-muted-foreground">AI & Digital Intelligence</p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-4">AI Intelligence Platform</h2>
                <p className="mb-6 text-lg text-muted-foreground">
                  Deploy AI-powered analytics, real-time intelligence, and digital twin visualization. Get predictive insights, automated recommendations, and complete operational visibility with our advanced AI platform.
                </p>
                <Link
                  href="/ai"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90"
                >
                  Explore AI Platform
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Operations Section */}
        <section className="mt-16 mb-16">
          <div className="rounded-lg border border-border bg-card p-8 text-card-foreground">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-4">Stadium Operations Portal</h2>
                <p className="mb-6 text-lg text-muted-foreground">
                  Manage stadium operations with role-based dashboards for security, medical, volunteers, crowd management, and executive oversight. Real-time incident tracking, staff coordination, and emergency response.
                </p>
                <Link
                  href="/operations"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90"
                >
                  Access Operations Portal
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
              <div className="rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 p-12 text-center">
                <Settings className="mx-auto h-12 w-12 text-primary mb-4" />
                <p className="text-muted-foreground">Role-Based Operations Management</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mt-16">
          <h2 className="mb-12 text-3xl font-bold text-foreground">Platform Features</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Real-time Updates', description: 'Live match statistics and instant notifications' },
              { title: 'Ticket Management', description: 'Secure ticket handling and QR code access' },
              { title: 'Stadium Navigation', description: 'Interactive maps and facility location' },
              { title: 'Food Ordering', description: 'Pre-order food and check queue times' },
              { title: 'Merchandise Shop', description: 'Official products and collectibles' },
              { title: 'Player Analytics', description: 'Detailed performance metrics and comparisons' },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-border bg-card p-6 text-card-foreground"
              >
                <h3 className="mb-2 font-bold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
