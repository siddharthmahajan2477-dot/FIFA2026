'use client'

import React, { useState } from 'react'
import { useMatches } from '../../hooks/useMatches'
import { LiveIndicator } from '@/components/LiveIndicator'
import { AlertCircle, Calendar, Clock, BarChart3, Users } from 'lucide-react'

export default function MatchCenter() {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'players' | 'stats' | 'formation'>('overview')
  const { matches, loading } = useMatches()

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'players', label: 'Player Ratings' },
    { id: 'stats', label: 'Statistics' },
    { id: 'formation', label: 'Formation' },
  ]

  const liveMatch = matches.find((m) => m.status === 'live')

  if (loading) {
    return (
      <main className="min-h-screen bg-background py-6 sm:py-8 lg:py-10 animate-pulse">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="h-40 bg-card/50 rounded-xl" />
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
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-foreground">Match Center</h1>
            {liveMatch && <LiveIndicator />}
          </div>
        </div>

        {/* Live Score Board */}
        <div className="mb-8 rounded-lg border border-border bg-gradient-to-r from-card to-card/50 p-6 text-card-foreground">
          {liveMatch ? (
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              {/* Home Team */}
              <div className="flex-1 text-center">
                <div className="mb-3 text-4xl">⚽</div>
                <h2 className="text-2xl font-bold text-foreground">{liveMatch.homeTeam}</h2>
                <p className="text-sm text-muted-foreground">Home</p>
              </div>

              {/* Score */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-4">
                  <span className="text-5xl font-bold text-primary">{liveMatch.homeScore}</span>
                  <span className="text-3xl font-bold text-muted-foreground">-</span>
                  <span className="text-5xl font-bold text-primary">{liveMatch.awayScore}</span>
                </div>
                <div className="text-sm font-semibold text-muted-foreground">Live</div>
              </div>

              {/* Away Team */}
              <div className="flex-1 text-center">
                <div className="mb-3 text-4xl">⚽</div>
                <h2 className="text-2xl font-bold text-foreground">{liveMatch.awayTeam}</h2>
                <p className="text-sm text-muted-foreground">Away</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 text-xs text-muted-foreground flex flex-col items-center justify-center gap-2">
              <Calendar className="h-8 w-8 opacity-35" />
              <p className="font-bold">No active live matches</p>
              <p className="opacity-75">Check back during scheduled match hours</p>
            </div>
          )}
        </div>

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

        {/* Overview Tab */}
        {selectedTab === 'overview' && (
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {/* Match Statistics */}
              <div className="mb-8">
                <h2 className="mb-4 text-lg font-bold text-foreground flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Match Statistics
                </h2>
                <div className="rounded-xl border border-dashed border-border/40 bg-card/10 p-8 text-center text-xs text-muted-foreground">
                  No stats available
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="lg:col-span-1">
              <h2 className="mb-4 text-lg font-bold text-foreground flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Match Timeline
              </h2>
              <div className="rounded-xl border border-dashed border-border/40 bg-card/10 p-8 text-center text-xs text-muted-foreground">
                No match events logged
              </div>
            </div>
          </div>
        )}

        {/* Players Tab */}
        {selectedTab === 'players' && (
          <div>
            <h2 className="mb-4 text-lg font-bold text-foreground flex items-center gap-2">
              <Users className="h-5 w-5" />
              Player Ratings
            </h2>
            <div className="rounded-xl border border-dashed border-border/40 bg-card/10 p-8 text-center text-xs text-muted-foreground">
              No player stats registered
            </div>
          </div>
        )}

        {/* Stats Tab */}
        {selectedTab === 'stats' && (
          <div>
            <h2 className="mb-4 text-lg font-bold text-foreground">Advanced Statistics</h2>
            <div className="rounded-lg border border-border bg-card p-6 text-card-foreground">
              <div className="text-center text-muted-foreground py-12 text-xs">
                No advanced analytics available
              </div>
            </div>
          </div>
        )}

        {/* Formation Tab */}
        {selectedTab === 'formation' && (
          <div>
            <h2 className="mb-4 text-lg font-bold text-foreground">Team Formation</h2>
            <div className="rounded-lg border border-border bg-card p-6 text-card-foreground">
              <div className="text-center text-muted-foreground py-12 text-xs">
                Formation details unavailable
              </div>
            </div>
          </div>
        )}

      </div>
    </main>
  )
}
