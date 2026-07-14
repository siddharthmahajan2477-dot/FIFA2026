'use client'

import React, { useState, useEffect } from 'react'
import { AlertCircle } from 'lucide-react'

export default function OrganizationsPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-background py-8 animate-pulse">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="h-32 bg-card/50 rounded-xl" />
          <div className="h-40 bg-card/50 rounded-xl" />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground">Organization Management</h1>
          <p className="mt-2 text-lg text-muted-foreground">Manage departments, teams, and organizational hierarchy</p>
        </div>

        {/* Organizations Overview */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4">Organizations</h3>
          <div className="rounded-xl border border-dashed border-border/40 bg-card/10 p-8 text-center text-xs text-muted-foreground flex flex-col items-center justify-center gap-2">
            <AlertCircle className="h-8 w-8 opacity-35" />
            <p className="font-bold">No departments registered</p>
          </div>
        </div>

        {/* Teams */}
        <div>
          <h3 className="text-lg font-bold mb-4">Teams</h3>
          <div className="rounded-xl border border-dashed border-border/40 bg-card/10 p-8 text-center text-xs text-muted-foreground flex flex-col items-center justify-center gap-2">
            <AlertCircle className="h-8 w-8 opacity-35" />
            <p className="font-bold">No active teams found</p>
          </div>
        </div>
      </div>
    </main>
  )
}
