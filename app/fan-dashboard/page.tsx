'use client'

import React from 'react'
import Link from 'next/link'
import { useAuth } from '../../hooks/useAuth'
import { useMatches } from '../../hooks/useMatches'
import { useNotifications } from '../../hooks/useNotifications'
import { useTickets } from '../../hooks/useTickets'
import { MatchCard } from '@/components/MatchCard'
import { StatCard } from '@/components/StatCard'
import { Countdown } from '@/components/Countdown'
import { WeatherCard } from '@/components/WeatherCard'
import { TransportCard } from '@/components/TransportCard'
import { NewsCard } from '@/components/NewsCard'
import { NotificationCard } from '@/components/NotificationCard'
import { Bell, Calendar, MapPin, Navigation, BarChart3, Users, Trophy, Zap, AlertCircle } from 'lucide-react'

export default function FanDashboard() {
  const { user } = useAuth()
  const { matches, countdown, loading: matchesLoading } = useMatches()
  const { notifications, dismiss } = useNotifications()
  const { tickets, loading: ticketsLoading } = useTickets()

  const matchDate = countdown ? new Date(countdown.targetDate) : new Date(Date.now() + 2 * 60 * 60 * 1000)
  const liveMatch = matches.find((m) => m.status === 'live')
  const upcomingMatch = matches.find((m) => m.status === 'scheduled')

  const isLoading = matchesLoading || ticketsLoading

  return (
    <main className="min-h-screen bg-background pt-[112px] pb-6 sm:pb-8 lg:pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-xl p-4 hero-glass-container shadow-sm">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Fan Dashboard</h1>
            <p className="mt-1 text-muted-foreground">
              Welcome back, {user ? user.name : 'Fan'}! ({user ? user.membership : 'Guest Session'})
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground transition-all hover:bg-primary/90">
            <Bell className="h-5 w-5" />
            Notifications
          </button>
        </div>

        {/* Notifications */}
        {notifications.length > 0 ? (
          <div className="mb-8 space-y-3">
            {notifications.map((notif) => (
              <NotificationCard
                key={notif.id}
                title={notif.title}
                message={notif.message}
                type={notif.type as any}
                timestamp={typeof notif.timestamp === 'string' ? notif.timestamp : notif.timestamp.toLocaleTimeString()}
                onDismiss={() => dismiss(notif.id)}
              />
            ))}
          </div>
        ) : (
          <div className="mb-8 p-3 rounded-lg border border-border/40 bg-card/20 text-xs text-muted-foreground flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            <span>No notifications active</span>
          </div>
        )}

        {/* Loading Skeletons */}
        {isLoading ? (
          <div className="space-y-6 animate-pulse">
            <div className="h-32 bg-card/50 rounded-xl" />
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="h-64 bg-card/50 rounded-xl" />
              <div className="h-64 bg-card/50 rounded-xl" />
              <div className="h-64 bg-card/50 rounded-xl" />
            </div>
          </div>
        ) : (
          <>
            {/* Live Match Section */}
            <section className="mb-8">
              <h2 className="mb-4 text-xl font-bold text-foreground">Live Match</h2>
              {liveMatch ? (
                <MatchCard
                  homeTeam={liveMatch.homeTeam}
                  awayTeam={liveMatch.awayTeam}
                  homeScore={liveMatch.homeScore ?? undefined}
                  awayScore={liveMatch.awayScore ?? undefined}
                  isLive={true}
                  status="live"
                />
              ) : (
                <div className="rounded-xl border border-dashed border-border/40 bg-card/10 p-8 text-center text-muted-foreground flex flex-col items-center justify-center gap-2">
                  <AlertCircle className="h-8 w-8 opacity-40" />
                  <p className="text-sm font-semibold">No live matches in progress</p>
                  <p className="text-xs opacity-75">Waiting for live tournament stream initialization</p>
                </div>
              )}
            </section>

            {/* Main Grid */}
            <div className="mb-8 grid gap-6 lg:grid-cols-3">
              
              {/* Column 1 - Next Match & Countdown */}
              <div className="lg:col-span-1">
                <div className="space-y-6">
                  <div>
                    <h2 className="mb-3 text-lg font-bold text-foreground flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Next Match
                    </h2>
                    {upcomingMatch ? (
                      <MatchCard
                        homeTeam={upcomingMatch.homeTeam}
                        awayTeam={upcomingMatch.awayTeam}
                        time={upcomingMatch.time || 'TBD'}
                        status="upcoming"
                      />
                    ) : (
                      <div className="rounded-xl border border-dashed border-border/40 bg-card/10 p-6 text-center text-xs text-muted-foreground">
                        No upcoming matches scheduled
                      </div>
                    )}
                  </div>

                  {/* Countdown */}
                  <div className="rounded-lg border border-border bg-card p-6 text-card-foreground">
                    <h3 className="mb-4 text-sm font-bold uppercase text-muted-foreground">Match Countdown</h3>
                    <Countdown targetDate={matchDate} />
                  </div>

                  {/* Favorite Team */}
                  <div className="rounded-lg border border-border bg-card p-4 text-card-foreground">
                    <p className="mb-3 text-xs font-semibold uppercase text-muted-foreground">Favorite Team</p>
                    {user && user.favTeam && user.favTeam !== 'None' ? (
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-2xl border border-primary/20">
                          🏁
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground">{user.favTeam}</p>
                          <p className="text-xs text-muted-foreground">{user.favClub || 'Global Fan'}</p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground">No favorite team configured in profile preferences</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Column 2 - Tickets & Weather */}
              <div className="lg:col-span-1">
                <div className="space-y-6">
                  <div>
                    <h2 className="mb-3 text-lg font-bold text-foreground flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Your Tickets
                    </h2>
                    {tickets.length > 0 ? (
                      <StatCard
                        label="Active Tickets"
                        value={tickets.length.toString()}
                        subtext="View passes in detail"
                        icon={<MapPin className="h-5 w-5" />}
                      />
                    ) : (
                      <div className="rounded-xl border border-dashed border-border/40 bg-card/10 p-8 text-center text-xs text-muted-foreground flex flex-col items-center justify-center gap-2">
                        <AlertCircle className="h-6 w-6 opacity-35" />
                        <p>No active tickets found</p>
                      </div>
                    )}
                  </div>

                  {/* Weather */}
                  <WeatherCard
                    temperature={28}
                    condition="Partly Cloudy"
                    humidity={65}
                    windSpeed={12}
                    location="MetLife Stadium, East Rutherford"
                  />
                </div>
              </div>

              {/* Column 3 - Transport & Actions */}
              <div className="lg:col-span-1">
                <div className="space-y-6">
                  <div>
                    <h2 className="mb-3 text-lg font-bold text-foreground flex items-center gap-2">
                      <Navigation className="h-5 w-5" />
                      Transport & Parking
                    </h2>
                    <TransportCard
                      mode="parking"
                      status="delayed"
                      nextArrival="Full"
                      location="Parking Lot A"
                      capacity={100}
                    />
                  </div>

                  <TransportCard
                    mode="metro"
                    status="on-time"
                    nextArrival="Waiting for sync"
                    location="MetLife Central Transit Station"
                    capacity={0}
                  />

                  {/* Quick Actions */}
                  <div className="rounded-lg border border-border bg-card p-4 text-card-foreground">
                    <h3 className="mb-3 text-sm font-bold uppercase text-muted-foreground">Quick Actions</h3>
                    <div className="space-y-2">
                      <Link href="/tickets" className="w-full text-center block rounded bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90">
                        View Tickets
                      </Link>
                      <Link href="/stadium-navigation" className="w-full text-center block rounded border border-border px-4 py-2 text-sm font-semibold text-foreground transition-all hover:bg-muted">
                        Stadium Map
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Key Statistics */}
            <section className="mb-8">
              <h2 className="mb-4 text-xl font-bold text-foreground flex items-center gap-2">
                <BarChart3 className="h-6 w-6" />
                Key Statistics
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                  label="Matches Attended"
                  value="0"
                  subtext="Waiting for check-in"
                  icon={<Trophy className="h-5 w-5" />}
                />
                <StatCard
                  label="Goals Watched"
                  value="0"
                  subtext="None watches"
                  icon={<Zap className="h-5 w-5" />}
                />
                <StatCard
                  label="Fan Points"
                  value="0"
                  subtext="No rewards earned"
                  icon={<Users className="h-5 w-5" />}
                />
                <StatCard
                  label="Stadium Rating"
                  value="--"
                  subtext="Pending review submission"
                  icon={<Trophy className="h-5 w-5" />}
                />
              </div>
            </section>

            {/* News Section */}
            <section>
              <h2 className="mb-4 text-xl font-bold text-foreground">Recent News</h2>
              <div className="rounded-xl border border-dashed border-border/40 bg-card/10 p-8 text-center text-xs text-muted-foreground">
                No recent tournament updates or match reports found.
              </div>
            </section>
          </>
        )}

      </div>
    </main>
  )
}
