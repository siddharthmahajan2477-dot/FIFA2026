'use client'

import React, { useState } from 'react'
import { usePlayer } from '../../hooks/usePlayer'
import { StatCard } from '@/components/StatCard'
import { Users, AlertCircle } from 'lucide-react'

export default function PlayerAnalytics() {
  const { players, loading } = usePlayer()

  if (loading) {
    return (
      <main className="min-h-screen bg-background py-6 sm:py-8 lg:py-10 animate-pulse">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="h-32 bg-card/50 rounded-xl" />
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 h-64 bg-card/50 rounded-xl" />
            <div className="h-64 bg-card/50 rounded-xl" />
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background py-6 sm:py-8 lg:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Player Analytics</h1>
          <p className="mt-1 text-muted-foreground">Individual player statistics and performance data</p>
        </div>

        {/* Player Profiles Grid */}
        {players.length > 0 ? (
          <div>
            {/* Render dynamically if players exist */}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border/40 bg-card/10 p-8 text-center text-xs text-muted-foreground flex flex-col items-center justify-center gap-2">
            <AlertCircle className="h-8 w-8 opacity-35" />
            <p className="font-bold">No player analytics registered</p>
            <p className="opacity-75">Player telemetry will synchronize on match kickoff</p>
          </div>
        )}

      </div>
    </main>
  )
}
