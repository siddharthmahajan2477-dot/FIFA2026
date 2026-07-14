'use client'

import Link from 'next/link'
import {
  Brain,
  Zap,
  BarChart3,
  Map,
  Lightbulb,
  AlertTriangle,
  Search as SearchIcon,
  ArrowRight,
} from 'lucide-react'

export default function AIPlatform() {
  const modules = [
    {
      title: 'AI Command Center',
      description: 'Real-time AI assistant for stadium operations with insights and recommendations',
      icon: Brain,
      href: '/ai/command-center',
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Executive Dashboard',
      description: 'High-level performance metrics, predictions, and strategic insights',
      icon: BarChart3,
      href: '/ai/executive-dashboard',
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Digital Twin',
      description: 'Real-time visualization and monitoring of all stadium systems',
      icon: Map,
      href: '/ai/digital-twin',
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Operational Intelligence',
      description: 'AI-discovered insights, predictions, and actionable recommendations',
      icon: Lightbulb,
      href: '/ai/intelligence',
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      title: 'Incident Intelligence',
      description: 'Real-time incident analysis, pattern detection, and prevention',
      icon: AlertTriangle,
      href: '/ai/incident-intelligence',
      color: 'from-red-500 to-red-600',
    },
    {
      title: 'Smart Search & Reporting',
      description: 'AI-powered search and automated report generation',
      icon: SearchIcon,
      href: '/ai/search-reporting',
      color: 'from-pink-500 to-pink-600',
    },
  ]

  const features = [
    {
      title: 'Real-time Insights',
      description: 'AI analyzes stadium operations 24/7 to provide actionable insights',
    },
    {
      title: 'Predictive Analytics',
      description: 'Forecast crowd patterns, revenue, and operational challenges',
    },
    {
      title: 'Automated Recommendations',
      description: 'Get AI-suggested actions with confidence scores and expected outcomes',
    },
    {
      title: 'Digital Twin Visualization',
      description: 'Monitor all stadium systems in real-time with live capacity and health data',
    },
    {
      title: 'Incident Intelligence',
      description: 'Detect patterns, assess risks, and prevent future incidents',
    },
    {
      title: 'Smart Search',
      description: 'Search across all stadium data - reports, incidents, profiles, metrics',
    },
  ]

  return (
    <main className="min-h-screen bg-background pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 mb-4">
            <Brain className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl">
            AI & Digital Intelligence
            <span className="block text-primary">Smart Stadium Operating System</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground sm:text-xl max-w-2xl mx-auto">
            Harness artificial intelligence to optimize stadium operations, predict challenges, and make data-driven decisions with real-time insights and automated recommendations.
          </p>
          <div className="mt-8 flex gap-4 justify-center flex-wrap">
            <Link
              href="/ai/command-center"
              className="rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90"
            >
              Enter AI Command Center
            </Link>
            <a
              href="#modules"
              className="rounded-lg border border-border px-8 py-3 font-semibold text-foreground transition-all hover:bg-muted"
            >
              Explore All Modules
            </a>
          </div>
        </div>

        {/* Featured Module */}
        <div className="mb-16 rounded-lg border border-border bg-card p-8 text-card-foreground shadow-lg">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">AI Command Center</h2>
              <p className="mb-4 text-lg text-muted-foreground">
                Your AI-powered control room for stadium operations. Chat with an AI assistant that understands your operations, analyzes real-time data, and provides intelligent recommendations.
              </p>
              <ul className="mb-6 space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Real-time insights and alerts
                </li>
                <li className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  Conversational AI assistant
                </li>
                <li className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Automated recommendations
                </li>
              </ul>
              <Link
                href="/ai/command-center"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90"
              >
                Launch Command Center
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
            <div className="rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 p-12 text-center">
              <div className="text-6xl">🧠</div>
              <p className="mt-4 text-muted-foreground font-semibold">AI-Powered Operations</p>
            </div>
          </div>
        </div>

        {/* All Modules Grid */}
        <section id="modules">
          <h2 className="mb-12 text-3xl font-bold text-foreground">AI Intelligence Modules</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((module) => {
              const Icon = module.icon
              return (
                <Link
                  key={module.href}
                  href={module.href}
                  className="group rounded-lg border border-border bg-card p-6 text-card-foreground transition-all hover:border-primary hover:shadow-md"
                >
                  <div
                    className={`mb-4 inline-flex rounded-lg bg-gradient-to-br ${module.color} p-3 text-white`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-foreground group-hover:text-primary">
                    {module.title}
                  </h3>
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

        {/* Features */}
        <section className="mt-16">
          <h2 className="mb-12 text-3xl font-bold text-foreground">AI Platform Capabilities</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, idx) => (
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

        {/* CTA Section */}
        <section className="mt-16 rounded-lg border border-border bg-gradient-to-r from-primary/10 to-secondary/10 p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Transform Stadium Operations?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Deploy AI intelligence across your stadium for real-time insights, predictive analytics, and automated optimization.
          </p>
          <Link
            href="/ai/command-center"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90"
          >
            Get Started with AI
            <ArrowRight className="h-5 w-5" />
          </Link>
        </section>
      </div>
    </main>
  )
}
