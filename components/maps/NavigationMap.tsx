'use client'

import React, { useEffect, useRef, useState } from 'react'
import type { MapMarker, LatLng } from '@/types/map'
import {
  STADIUM_CENTER,
  OSM_TILE_URL,
  OSM_ATTRIBUTION,
  buildMarkerHtml,
  buildUserMarkerHtml,
  MARKER_COLOR,
} from '@/lib/map-utils'
import { loadLeaflet } from '@/lib/leaflet-css'

interface NavigationMapProps {
  origin: MapMarker | null
  destination: MapMarker | null
  userLocation: LatLng | null
  className?: string
}

export default function NavigationMap({ origin, destination, userLocation, className = '' }: NavigationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const leafletMapRef = useRef<any>(null)
  const routeLineRef = useRef<any>(null)
  const markerRefsRef = useRef<any[]>([])
  const [mapReady, setMapReady] = useState(false)

  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) return
    let cancelled = false

    loadLeaflet().then((L) => {
      if (cancelled || !mapRef.current || !L) return

      const map = L.map(mapRef.current, {
        center: [STADIUM_CENTER.lat, STADIUM_CENTER.lng],
        zoom: 17,
        zoomControl: true,
        attributionControl: false,
      })
      L.tileLayer(OSM_TILE_URL, { attribution: OSM_ATTRIBUTION, maxZoom: 20 }).addTo(map)
      L.control.attribution({ position: 'bottomright', prefix: false }).addTo(map)

      leafletMapRef.current = map
      setMapReady(true)
    })

    return () => {
      cancelled = true
      leafletMapRef.current?.remove()
      leafletMapRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!mapReady || !leafletMapRef.current) return
    const L = (window as any).L
    if (!L) return

    markerRefsRef.current.forEach(m => m.remove())
    markerRefsRef.current = []
    routeLineRef.current?.remove()
    routeLineRef.current = null

    const waypoints: LatLng[] = []
    if (userLocation) waypoints.push(userLocation)
    if (origin) waypoints.push(origin.position)
    if (destination) waypoints.push(destination.position)

    if (waypoints.length < 2) {
      leafletMapRef.current.setView([STADIUM_CENTER.lat, STADIUM_CENTER.lng], 17)
      return
    }

    const latLngs = waypoints.map(p => [p.lat, p.lng] as [number, number])
    const line = L.polyline(latLngs, { color: '#6366f1', weight: 4, opacity: 0.9, dashArray: '10 8', lineCap: 'round' }).addTo(leafletMapRef.current)
    routeLineRef.current = line
    leafletMapRef.current.fitBounds(line.getBounds(), { padding: [60, 60], animate: true })

    if (origin) {
      const icon = L.divIcon({ className: '', html: buildMarkerHtml(origin.category, 36), iconSize: [36, 36], iconAnchor: [18, 36] })
      const m = L.marker([origin.position.lat, origin.position.lng], { icon })
        .bindPopup(`<b style="color:#fff">${origin.label}</b>`, { className: 'stadium-popup' })
        .addTo(leafletMapRef.current)
      markerRefsRef.current.push(m)
    }

    if (destination) {
      const icon = L.divIcon({ className: '', html: buildMarkerHtml(destination.category, 40), iconSize: [40, 40], iconAnchor: [20, 40] })
      const m = L.marker([destination.position.lat, destination.position.lng], { icon })
        .bindPopup(`<b style="color:#fff">${destination.label}</b><br><span style="color:rgba(255,255,255,0.6);font-size:11px;">Destination</span>`, { className: 'stadium-popup' })
        .openPopup()
        .addTo(leafletMapRef.current)
      markerRefsRef.current.push(m)
    }

    if (userLocation) {
      const icon = L.divIcon({ className: '', html: buildUserMarkerHtml(22), iconSize: [22, 22], iconAnchor: [11, 11] })
      markerRefsRef.current.push(L.marker([userLocation.lat, userLocation.lng], { icon }).addTo(leafletMapRef.current))
    }
  }, [mapReady, origin, destination, userLocation])

  return (
    <div className={`relative ${className}`}>
      <div ref={mapRef} className="w-full h-full rounded-xl overflow-hidden" style={{ minHeight: 400 }} />
      {!mapReady && (
        <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-card/80 backdrop-blur-sm z-10">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      )}
      {origin && destination && (
        <div className="absolute bottom-4 left-4 right-4 z-[1000] rounded-xl bg-card/90 backdrop-blur-md border border-border p-3 flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground">Navigating</p>
            <p className="text-sm font-semibold text-foreground truncate">{origin.label} → {destination.label}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-xs text-muted-foreground">Est. walk</p>
            <p className="text-sm font-bold text-primary">~3 min</p>
          </div>
        </div>
      )}
      <style>{`
        .stadium-popup .leaflet-popup-content-wrapper{background:rgba(15,15,25,0.92);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.08);border-radius:12px;color:#fff;}
        .stadium-popup .leaflet-popup-tip{background:rgba(15,15,25,0.92);}
        .stadium-popup .leaflet-popup-close-button{color:rgba(255,255,255,0.5);}
      `}</style>
    </div>
  )
}
