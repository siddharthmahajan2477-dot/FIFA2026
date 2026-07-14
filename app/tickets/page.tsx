'use client'

import React, { useState } from 'react'
import { useTickets } from '../../hooks/useTickets'
import { StatCard } from '@/components/StatCard'
import { Ticket, AlertCircle } from 'lucide-react'

export default function TicketsPage() {
  const [selectedTab, setSelectedTab] = useState<'active' | 'history' | 'transfer'>('active')
  const { tickets, loading } = useTickets()

  const tabs = [
    { id: 'active', label: 'Active Tickets' },
    { id: 'history', label: 'Ticket History' },
    { id: 'transfer', label: 'Transfer Tickets' },
  ]

  const activeTickets = tickets.filter((t) => t.status === 'active')
  const ticketHistory = tickets.filter((t) => t.status === 'used')

  if (loading) {
    return (
      <main className="min-h-screen bg-background py-6 sm:py-8 lg:py-10 animate-pulse">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="h-32 bg-card/50 rounded-xl" />
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="h-24 bg-card/50 rounded-xl" />
            <div className="h-24 bg-card/50 rounded-xl" />
            <div className="h-24 bg-card/50 rounded-xl" />
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
          <h1 className="text-3xl font-bold text-foreground">My Tickets</h1>
          <p className="mt-1 text-muted-foreground">Manage your FIFA World Cup 2026 tickets</p>
        </div>

        {/* Ticket Stats */}
        <section className="mb-8">
          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard
              label="Active Tickets"
              value={activeTickets.length}
              subtext="Upcoming matches"
              icon={<Ticket className="h-5 w-5" />}
            />
            <StatCard
              label="Total Spent"
              value={`$${activeTickets.reduce((sum, t) => sum + (t.price || 0), 0)}`}
              subtext="Active tickets value"
            />
            <StatCard
              label="Matches Attended"
              value={ticketHistory.length}
              subtext="This tournament"
            />
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

        {/* Active Tickets */}
        {selectedTab === 'active' && (
          <div>
            <h2 className="mb-4 text-lg font-bold text-foreground">Your Upcoming Matches</h2>
            {activeTickets.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2">
                {/* Dynamically mapped TicketCards if tickets exist */}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-border/40 bg-card/10 p-8 text-center text-xs text-muted-foreground flex flex-col items-center justify-center gap-2">
                <AlertCircle className="h-8 w-8 opacity-35" />
                <p className="font-bold">No active tickets found</p>
                <p className="opacity-75">Retrieve or purchase passes to unlock access</p>
              </div>
            )}
          </div>
        )}

        {/* Ticket History */}
        {selectedTab === 'history' && (
          <div>
            <h2 className="mb-4 text-lg font-bold text-foreground">Past Matches</h2>
            {ticketHistory.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2">
                {/* Dynamically mapped TicketCards for past tickets */}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-border/40 bg-card/10 p-8 text-center text-xs text-muted-foreground flex flex-col items-center justify-center gap-2">
                <AlertCircle className="h-8 w-8 opacity-35" />
                <p className="font-bold">No ticket history found</p>
                <p className="opacity-75">Your attended matches logs will display here</p>
              </div>
            )}
          </div>
        )}

        {/* Transfer Tickets */}
        {selectedTab === 'transfer' && (
          <div className="max-w-md rounded-lg border border-border bg-card p-6 text-card-foreground">
            <h2 className="mb-4 font-bold text-foreground">Transfer Tickets</h2>
            <p className="text-sm text-muted-foreground mb-6">Securely transfer your tickets to friends or family using their email address.</p>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-400">Recipient Email Address</label>
                <input
                  type="email"
                  placeholder="friend@example.com"
                  className="w-full rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-700"
                />
              </div>
              <button disabled className="w-full rounded bg-neutral-900 px-4 py-2 text-xs font-semibold text-neutral-450 cursor-not-allowed opacity-50">
                Transfer Ticket
              </button>
            </div>
          </div>
        )}

      </div>
    </main>
  )
}
