'use client'

import React, { useState, useMemo, useEffect } from 'react'
import dynamic from 'next/dynamic'
import {
  MapPin,
  Accessibility,
  AlertTriangle,
  Utensils,
  Search,
  Navigation,
  Layers,
  Info,
  ChevronRight,
  X,
} from 'lucide-react'
import { useStadiumMap } from '@/hooks/useStadiumMap'
import { STADIUM_MARKERS, MARKER_EMOJI } from '@/lib/map-utils'
import type { MapMarker, MarkerCategory } from '@/types/map'

// ── Dynamic imports (SSR disabled — Leaflet requires window) ─────────────────
const StadiumMap = dynamic(() => import('@/components/maps/StadiumMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full flex items-center justify-center rounded-xl bg-card/50 border border-border" style={{ height: 560 }}>
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-sm text-muted-foreground">Loading OpenStreetMap…</p>
      </div>
    </div>
  ),
})

const NavigationMap = dynamic(() => import('@/components/maps/NavigationMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full flex items-center justify-center rounded-xl bg-card/50 border border-border" style={{ height: 400 }}>
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  ),
})

const IndoorMap = dynamic(() => import('@/components/maps/IndoorMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full flex items-center justify-center rounded-xl bg-card/50 border border-border" style={{ height: 420 }}>
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  ),
})

// ── Category filter tabs ──────────────────────────────────────────────────────
type CategoryTab = 'all' | 'restrooms' | 'food' | 'medical' | 'accessibility' | 'emergency' | 'transport'

const CATEGORY_TABS = [
  { id: 'all' as CategoryTab, label: 'All', icon: Layers },
  { id: 'restrooms' as CategoryTab, label: 'Restrooms', icon: MapPin },
  { id: 'food' as CategoryTab, label: 'Food', icon: Utensils },
  { id: 'medical' as CategoryTab, label: 'Medical', icon: AlertTriangle },
  { id: 'accessibility' as CategoryTab, label: 'Accessible', icon: Accessibility },
  { id: 'emergency' as CategoryTab, label: 'Emergency', icon: AlertTriangle },
  { id: 'transport' as CategoryTab, label: 'Transport', icon: Navigation },
]

const CATEGORY_TAB_MARKERS: Record<CategoryTab, MarkerCategory[]> = {
  all: [],
  restrooms: ['restroom_male', 'restroom_female', 'restroom_accessible'],
  food: ['food', 'restaurant'],
  medical: ['medical'],
  accessibility: ['restroom_accessible', 'info'],
  emergency: ['emergency_exit', 'fire', 'security', 'medical'],
  transport: ['bus', 'taxi', 'metro', 'parking'],
}

type MapView = 'stadium' | 'navigation' | 'indoor'

// ── Component ─────────────────────────────────────────────────────────────────
export default function StadiumNavigation() {
  const [loading, setLoading] = useState(true)
  const [mapView, setMapView] = useState<MapView>('stadium')
  const [activeTab, setActiveTab] = useState<CategoryTab>('all')
  const [navOrigin, setNavOrigin] = useState<MapMarker | null>(null)
  const [navDest, setNavDest] = useState<MapMarker | null>(null)
  const [pickingOrigin, setPickingOrigin] = useState(false)
  const [pickingDest, setPickingDest] = useState(false)
  const [indoorFloor, setIndoorFloor] = useState(1)

  const {
    selectedMarker,
    setSelectedMarker,
    layers,
    toggleLayer,
    visibleMarkers,
    userLocation,
    locating,
    locateUser,
    searchQuery,
    setSearchQuery,
  } = useStadiumMap()

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(t)
  }, [])

  // Filtered list for the sidebar
  const sidebarMarkers = useMemo(() => {
    const cats = CATEGORY_TAB_MARKERS[activeTab]
    const base = cats.length > 0
      ? STADIUM_MARKERS.filter((m) => cats.includes(m.category))
      : STADIUM_MARKERS

    if (!searchQuery) return base
    const q = searchQuery.toLowerCase()
    return base.filter(
      (m) => m.label.toLowerCase().includes(q) || m.description?.toLowerCase().includes(q)
    )
  }, [activeTab, searchQuery])

  // Quick stats
  const nearestRestroom = STADIUM_MARKERS.find((m) =>
    ['restroom_male', 'restroom_female', 'restroom_accessible'].includes(m.category)
  )
  const nearestFood = STADIUM_MARKERS.find((m) => m.category === 'food')
  const nearestExit = STADIUM_MARKERS.find((m) => m.category === 'emergency_exit')

  if (loading) {
    return (
      <main className="min-h-screen bg-background py-6 sm:py-8 animate-pulse">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="h-32 bg-card/50 rounded-xl" />
          <div className="h-40 bg-card/50 rounded-xl" />
          <div className="h-[560px] bg-card/50 rounded-xl" />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background py-6 sm:py-8 lg:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Stadium Navigation</h1>
          <p className="mt-1 text-muted-foreground">
            Find facilities and navigate — powered by{' '}
            <span className="text-primary font-semibold">OpenStreetMap</span>
          </p>
        </div>

        {/* Quick Stats */}
        <section className="mb-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Current Section', value: userLocation ? 'Located' : '--', sub: userLocation ? 'GPS active' : 'Tap 📍 to locate' },
              { label: 'Nearest Restroom', value: nearestRestroom?.label.split(' ')[0] ?? '--', sub: '~80m away' },
              { label: 'Nearest Food', value: nearestFood?.label.split(' ')[0] ?? '--', sub: '~120m away' },
              { label: 'Emergency Exit', value: nearestExit ? 'Exit 1' : '--', sub: '~50m away' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-border bg-card p-4 text-card-foreground">
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="mt-2 text-xl font-bold text-foreground truncate">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{stat.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Map view selector */}
        <div className="mb-4 flex gap-2 flex-wrap">
          {([
            { id: 'stadium', label: '🗺 Stadium Map' },
            { id: 'navigation', label: '🧭 Navigate' },
            { id: 'indoor', label: '🏟 Indoor View' },
          ] as { id: MapView; label: string }[]).map((v) => (
            <button
              key={v.id}
              onClick={() => setMapView(v.id)}
              className={`rounded-lg border px-4 py-2 text-sm font-semibold transition-all ${
                mapView === v.id
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border bg-card text-muted-foreground hover:border-primary/50'
              }`}
            >
              {v.label}
            </button>
          ))}
          <div className="flex-1" />
          {/* Locate me */}
          <button
            onClick={locateUser}
            disabled={locating}
            className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground hover:border-primary/50 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {locating ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            ) : '📍'}
            {userLocation ? 'Located' : 'Locate Me'}
          </button>
        </div>

        {/* ── STADIUM MAP VIEW ── */}
        {mapView === 'stadium' && (
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Sidebar */}
            <div className="lg:w-72 flex-shrink-0 flex flex-col gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search locations…"
                  className="w-full rounded-xl border border-border bg-card pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Category tabs */}
              <div className="grid grid-cols-4 gap-1.5 lg:grid-cols-2">
                {CATEGORY_TABS.slice(0, 7).map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`rounded-lg border p-2 text-center transition-all ${
                        activeTab === tab.id
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border bg-card text-muted-foreground hover:border-primary/50'
                      }`}
                    >
                      <Icon className="mx-auto h-4 w-4 mb-1" />
                      <span className="text-[10px] font-semibold block leading-tight">{tab.label}</span>
                    </button>
                  )
                })}
              </div>

              {/* Location list */}
              <div className="rounded-xl border border-border bg-card overflow-hidden flex-1">
                <div className="px-3 py-2 border-b border-border flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground">Locations</span>
                  <span className="text-xs text-muted-foreground">{sidebarMarkers.length} found</span>
                </div>
                <div className="overflow-y-auto max-h-[420px] divide-y divide-border">
                  {sidebarMarkers.length === 0 ? (
                    <div className="py-8 text-center text-sm text-muted-foreground">
                      No locations found
                    </div>
                  ) : (
                    sidebarMarkers.map((marker) => (
                      <button
                        key={marker.id}
                        onClick={() => setSelectedMarker(marker)}
                        className={`w-full text-left flex items-center gap-3 px-3 py-2.5 hover:bg-muted/30 transition-colors ${
                          selectedMarker?.id === marker.id ? 'bg-primary/5' : ''
                        }`}
                      >
                        <span className="text-xl flex-shrink-0">{MARKER_EMOJI[marker.category]}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-foreground truncate">{marker.label}</p>
                          {marker.description && (
                            <p className="text-[11px] text-muted-foreground truncate">{marker.description}</p>
                          )}
                        </div>
                        {marker.status && (
                          <span className={`flex-shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                            marker.status === 'open' || marker.status === 'available'
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {marker.status}
                          </span>
                        )}
                        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Main map */}
            <div className="flex-1 min-w-0">
              <StadiumMap
                markers={visibleMarkers}
                layers={layers}
                onLayerToggle={toggleLayer}
                onMarkerSelect={setSelectedMarker}
                selectedMarker={selectedMarker}
                userLocation={userLocation}
                onLocateUser={locateUser}
                locating={locating}
                className="h-full"
              />
            </div>
          </div>
        )}

        {/* ── NAVIGATION VIEW ── */}
        {mapView === 'navigation' && (
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Route planner */}
            <div className="lg:w-72 flex-shrink-0 flex flex-col gap-3">
              <div className="rounded-xl border border-border bg-card p-4 flex flex-col gap-3">
                <h2 className="text-sm font-bold text-foreground">Route Planner</h2>

                {/* Origin */}
                <div>
                  <p className="text-xs text-muted-foreground mb-1.5">From</p>
                  {navOrigin ? (
                    <div className="flex items-center gap-2 rounded-lg bg-primary/10 border border-primary/20 px-3 py-2">
                      <span>{MARKER_EMOJI[navOrigin.category]}</span>
                      <span className="flex-1 text-xs font-semibold text-foreground truncate">{navOrigin.label}</span>
                      <button onClick={() => setNavOrigin(null)} className="text-muted-foreground hover:text-foreground">
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => { setPickingOrigin(true); setPickingDest(false) }}
                      className={`w-full rounded-lg border ${pickingOrigin ? 'border-primary bg-primary/5' : 'border-border bg-muted/30'} px-3 py-2 text-xs text-muted-foreground text-left hover:border-primary/50 transition-colors`}
                    >
                      {pickingOrigin ? '👆 Click a location on the list below…' : '+ Select start point'}
                    </button>
                  )}
                </div>

                {/* Destination */}
                <div>
                  <p className="text-xs text-muted-foreground mb-1.5">To</p>
                  {navDest ? (
                    <div className="flex items-center gap-2 rounded-lg bg-green-500/10 border border-green-500/20 px-3 py-2">
                      <span>{MARKER_EMOJI[navDest.category]}</span>
                      <span className="flex-1 text-xs font-semibold text-foreground truncate">{navDest.label}</span>
                      <button onClick={() => setNavDest(null)} className="text-muted-foreground hover:text-foreground">
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => { setPickingDest(true); setPickingOrigin(false) }}
                      className={`w-full rounded-lg border ${pickingDest ? 'border-green-500 bg-green-500/5' : 'border-border bg-muted/30'} px-3 py-2 text-xs text-muted-foreground text-left hover:border-green-500/50 transition-colors`}
                    >
                      {pickingDest ? '👆 Click a location on the list below…' : '+ Select destination'}
                    </button>
                  )}
                </div>

                {navOrigin && navDest && (
                  <div className="rounded-lg bg-primary/5 border border-primary/10 p-3">
                    <p className="text-xs font-bold text-primary mb-1">Route Ready</p>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div className="flex justify-between"><span>Distance</span><span className="text-foreground font-semibold">~320m</span></div>
                      <div className="flex justify-between"><span>Walk time</span><span className="text-foreground font-semibold">~4 min</span></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Location picker list */}
              {(pickingOrigin || pickingDest) && (
                <div className="rounded-xl border border-border bg-card overflow-hidden">
                  <div className="px-3 py-2 border-b border-border">
                    <span className="text-xs font-bold text-foreground">
                      {pickingOrigin ? 'Select Start' : 'Select Destination'}
                    </span>
                  </div>
                  <div className="overflow-y-auto max-h-80 divide-y divide-border">
                    {STADIUM_MARKERS.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => {
                          if (pickingOrigin) { setNavOrigin(m); setPickingOrigin(false) }
                          else { setNavDest(m); setPickingDest(false) }
                        }}
                        className="w-full text-left flex items-center gap-3 px-3 py-2.5 hover:bg-muted/30 transition-colors"
                      >
                        <span className="text-lg">{MARKER_EMOJI[m.category]}</span>
                        <span className="text-xs font-semibold text-foreground flex-1 truncate">{m.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation map */}
            <div className="flex-1 min-w-0">
              <NavigationMap
                origin={navOrigin}
                destination={navDest}
                userLocation={userLocation}
                className="h-[540px]"
              />
            </div>
          </div>
        )}

        {/* ── INDOOR VIEW ── */}
        {mapView === 'indoor' && (
          <IndoorMap
            floor={indoorFloor as 1 | 2 | 3 | 4}
            onFloorChange={setIndoorFloor}
          />
        )}

        {/* Attribution note */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Map data © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">OpenStreetMap</a> contributors · No Google Maps · No API keys required
        </p>

      </div>
    </main>
  )
}
