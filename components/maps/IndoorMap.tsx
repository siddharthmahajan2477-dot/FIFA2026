'use client'

import React, { useEffect, useRef, useState } from 'react'
import {
  STADIUM_CENTER,
  OSM_TILE_URL,
  OSM_ATTRIBUTION,
  buildMarkerHtml,
  STADIUM_MARKERS,
} from '@/lib/map-utils'
import { loadLeaflet } from '@/lib/leaflet-css'

interface IndoorMapProps {
  floor?: 1 | 2 | 3 | 4
  onFloorChange?: (floor: number) => void
  className?: string
}

const FLOOR_LABELS: Record<number, string> = {
  1: 'Ground Level', 2: 'Concourse Level', 3: 'Upper Concourse', 4: 'Suite Level',
}

const FLOOR_CATEGORIES = {
  1: ['entrance','gate','ticket','parking','bus','taxi','metro'],
  2: ['food','restaurant','merchandise','restroom_male','restroom_female','restroom_accessible','atm','charging','info'],
  3: ['seating','medical','security','emergency_exit'],
  4: ['seating','fire'],
} as const

export default function IndoorMap({ floor = 1, onFloorChange, className = '' }: IndoorMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const leafletMapRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const [mapReady, setMapReady] = useState(false)
  const [currentFloor, setCurrentFloor] = useState(floor)

  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) return
    let cancelled = false

    loadLeaflet().then((L) => {
      if (cancelled || !mapRef.current || !L) return
      const map = L.map(mapRef.current, { center: [STADIUM_CENTER.lat, STADIUM_CENTER.lng], zoom: 18, zoomControl: true, attributionControl: false })
      L.tileLayer(OSM_TILE_URL, { attribution: OSM_ATTRIBUTION, maxZoom: 20 }).addTo(map)
      L.control.attribution({ position: 'bottomright', prefix: false }).addTo(map)
      leafletMapRef.current = map
      setMapReady(true)
    })

    return () => { cancelled = true; leafletMapRef.current?.remove(); leafletMapRef.current = null }
  }, [])

  useEffect(() => {
    if (!mapReady || !leafletMapRef.current) return
    const L = (window as any).L
    if (!L) return

    markersRef.current.forEach(m => m.remove())
    markersRef.current = []

    const allowed = FLOOR_CATEGORIES[currentFloor as keyof typeof FLOOR_CATEGORIES] as readonly string[]
    STADIUM_MARKERS.filter(m => allowed.includes(m.category)).forEach(marker => {
      const icon = L.divIcon({ className: '', html: buildMarkerHtml(marker.category, 34), iconSize: [34, 34], iconAnchor: [17, 34], popupAnchor: [0, -36] })
      const lm = L.marker([marker.position.lat, marker.position.lng], { icon })
        .bindPopup(`<div style="font-family:system-ui;color:#fff;min-width:150px;"><b style="font-size:13px;">${marker.label}</b>${marker.description?`<p style="font-size:11px;color:rgba(255,255,255,0.55);margin-top:4px;">${marker.description}</p>`:''}</div>`,
          { className: 'stadium-popup' })
        .addTo(leafletMapRef.current)
      markersRef.current.push(lm)
    })
  }, [mapReady, currentFloor])

  const handleFloorChange = (f: number) => {
    setCurrentFloor(f as 1 | 2 | 3 | 4)
    onFloorChange?.(f)
  }

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <div className="flex gap-2 flex-wrap">
        {([1, 2, 3, 4] as const).map(f => (
          <button key={f} onClick={() => handleFloorChange(f)}
            className={`flex-1 rounded-lg border px-3 py-2 text-xs font-semibold transition-all ${currentFloor===f?'border-primary bg-primary/10 text-primary':'border-border bg-card text-muted-foreground hover:border-primary/50'}`}>
            <div className="font-bold">Floor {f}</div>
            <div className="text-[10px] opacity-70">{FLOOR_LABELS[f]}</div>
          </button>
        ))}
      </div>

      <div className="relative">
        <div ref={mapRef} className="w-full rounded-xl overflow-hidden" style={{ height: 420 }} />
        {!mapReady && (
          <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-card/80 backdrop-blur-sm z-10">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        )}
        <div className="absolute top-3 left-3 z-[1000] rounded-full bg-card/90 backdrop-blur px-3 py-1 border border-border text-xs font-bold text-foreground">
          Floor {currentFloor} — {FLOOR_LABELS[currentFloor]}
        </div>
      </div>

      <style>{`
        .stadium-popup .leaflet-popup-content-wrapper{background:rgba(15,15,25,0.92);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.08);border-radius:12px;color:#fff;}
        .stadium-popup .leaflet-popup-tip{background:rgba(15,15,25,0.92);}
        .stadium-popup .leaflet-popup-close-button{color:rgba(255,255,255,0.5);}
      `}</style>
    </div>
  )
}
