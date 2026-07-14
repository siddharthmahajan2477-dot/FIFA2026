'use client'

import React, { useState } from 'react'
import { useMatches } from '../../hooks/useMatches'
import { Trophy, BarChart3, AlertCircle } from 'lucide-react'

export default function TournamentCenter() {
  const [selectedTab, setSelectedTab] = useState<'groups' | 'standings' | 'bracket' | 'awards'>('groups')
  const { matches, loading } = useMatches()

  const tabs = [
    { id: 'groups', label: 'Groups' },
    { id: 'standings', label: 'Standings' },
    { id: 'bracket', label: 'Knockout Bracket' },
    { id: 'awards', label: 'Awards' },
  ]

  if (loading) {
    return (
      <main className="min-h-screen bg-background py-6 sm:py-8 lg:py-10 animate-pulse">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="h-32 bg-card/50 rounded-xl" />
          <div className="grid gap-4 sm:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-card/50 rounded-xl" />
            ))}
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
          <h1 className="text-3xl font-bold text-foreground">Tournament Center</h1>
          <p className="mt-1 text-muted-foreground">FIFA World Cup 2026 comprehensive overview</p>
        </div>

        {/* Tournament Stats */}
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-bold text-foreground flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Tournament Overview
          </h2>
          <div className="grid gap-4 sm:grid-cols-4">
            <div className="rounded-lg border border-border bg-card p-4 text-card-foreground">
              <p className="text-xs text-muted-foreground">Total Matches</p>
              <p className="mt-2 text-2xl font-bold text-foreground">0</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4 text-card-foreground">
              <p className="text-xs text-muted-foreground">Teams Qualified</p>
              <p className="mt-2 text-2xl font-bold text-foreground">0</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4 text-card-foreground">
              <p className="text-xs text-muted-foreground">Total Goals</p>
              <p className="mt-2 text-2xl font-bold text-foreground">0</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4 text-card-foreground">
              <p className="text-xs text-muted-foreground">Avg Goals/Match</p>
              <p className="mt-2 text-2xl font-bold text-foreground">0.0</p>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <div className="mb-8 flex gap-2 border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as any)}
              className={`px-4 py-2 font-semibold transition-all cursor-pointer ${
                selectedTab === tab.id
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Groups Tab */}
        {selectedTab === 'groups' && (
          <div className="rounded-xl border border-dashed border-border/40 bg-card/10 p-8 text-center text-xs text-muted-foreground flex flex-col items-center justify-center gap-2">
            <AlertCircle className="h-8 w-8 opacity-35" />
            <p className="font-bold">No tournament groups configured</p>
          </div>
        )}

        {/* Standings Tab */}
        {selectedTab === 'standings' && (
          <div className="rounded-xl border border-dashed border-border/40 bg-card/10 p-8 text-center text-xs text-muted-foreground flex flex-col items-center justify-center gap-2">
            <AlertCircle className="h-8 w-8 opacity-35" />
            <p className="font-bold">No tournament standings online</p>
          </div>
        )}

        {/* Bracket Tab */}
        {selectedTab === 'bracket' && (
          <div className="rounded-xl border border-dashed border-border/40 bg-card/10 p-8 text-center text-xs text-muted-foreground flex flex-col items-center justify-center gap-2">
            <AlertCircle className="h-8 w-8 opacity-35" />
            <p className="font-bold">No knockout brackets scheduled</p>
          </div>
        )}

        {/* Awards Tab */}
        {selectedTab === 'awards' && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-6 text-card-foreground">
              <div className="mb-4 flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-foreground">Golden Boot (Top Goalscorer)</h3>
              </div>
              <p className="text-xs text-muted-foreground py-6 text-center">No goal stats recorded</p>
            </div>

            <div className="rounded-lg border border-border bg-card p-6 text-card-foreground">
              <div className="mb-4 flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-foreground">Golden Glove (Top Goalkeeper)</h3>
              </div>
              <p className="text-xs text-muted-foreground py-6 text-center">No clean sheets logged</p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
