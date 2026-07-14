'use client'

import React, { useEffect, useRef, useState } from 'react'
import type { MapMarker, MapLayer, MapLayerId, LatLng } from '@/types/map'
import {
  STADIUM_CENTER,
  STADIUM_DEFAULT_ZOOM,
  OSM_TILE_URL,
  OSM_ATTRIBUTION,
  buildMarkerHtml,
  buildUserMarkerHtml,
  MARKER_COLOR,
} from '@/lib/map-utils'
import { loadLeaflet } from '@/lib/leaflet-css'

interface StadiumMapProps {
  markers: MapMarker[]
  layers: MapLayer[]
  onLayerToggle: (id: MapLayerId) => void
  onMarkerSelect: (marker: MapMarker | null) => void
  selectedMarker: MapMarker | null
  userLocation: LatLng | null
  onLocateUser: () => void
  locating: boolean
  className?: string
}

export default function StadiumMap({
  markers,
  layers,
  onLayerToggle,
  onMarkerSelect,
  selectedMarker,
  userLocation,
  onLocateUser,
  locating,
  className = '',
}: StadiumMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const leafletMapRef = useRef<any>(null)
  const markersRef = useRef<Record<string, any>>({})
  const userMarkerRef = useRef<any>(null)
  const [mapReady, setMapReady] = useState(false)

  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) return
    let cancelled = false

    loadLeaflet().then((L) => {
      if (cancelled || !mapRef.current || !L) return

      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      const map = L.map(mapRef.current, {
        center: [STADIUM_CENTER.lat, STADIUM_CENTER.lng],
        zoom: STADIUM_DEFAULT_ZOOM,
        zoomControl: false,
        attributionControl: false,
      })

      L.tileLayer(OSM_TILE_URL, {
        attribution: OSM_ATTRIBUTION,
        maxZoom: 20,
        minZoom: 12,
      }).addTo(map)

      L.control.attribution({ position: 'bottomright', prefix: false }).addTo(map)
      L.control.zoom({ position: 'topright' }).addTo(map)
      L.control.scale({ position: 'bottomleft', metric: true, imperial: false }).addTo(map)

      leafletMapRef.current = map
      setMapReady(true)
    })

    return () => {
      cancelled = true
      if (leafletMapRef.current) {
        leafletMapRef.current.remove()
        leafletMapRef.current = null
      }
    }
  }, [])

  // Sync markers
  useEffect(() => {
    if (!mapReady || !leafletMapRef.current) return
    const L = (window as any).L
    if (!L) return

    Object.keys(markersRef.current).forEach((id) => {
      if (!markers.find((m) => m.id === id)) {
        markersRef.current[id].remove()
        delete markersRef.current[id]
      }
    })

    markers.forEach((marker) => {
      if (markersRef.current[marker.id]) return

      const icon = L.divIcon({
        className: '',
        html: buildMarkerHtml(marker.category, 36),
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -38],
      })

      const lm = L.marker([marker.position.lat, marker.position.lng], { icon })
        .bindPopup(buildPopupHtml(marker), { maxWidth: 280, className: 'stadium-popup' })

      lm.on('click', () => onMarkerSelect(marker))
      lm.addTo(leafletMapRef.current)
      markersRef.current[marker.id] = lm
    })
  }, [mapReady, markers, onMarkerSelect])

  // Open popup for selected marker
  useEffect(() => {
    if (!mapReady || !leafletMapRef.current || !selectedMarker) return
    const lm = markersRef.current[selectedMarker.id]
    if (lm) {
      lm.openPopup()
      leafletMapRef.current.setView(
        [selectedMarker.position.lat, selectedMarker.position.lng],
        18,
        { animate: true, duration: 0.5 }
      )
    }
  }, [mapReady, selectedMarker])

  // User location marker
  useEffect(() => {
    if (!mapReady || !leafletMapRef.current) return
    const L = (window as any).L
    if (!L) return

    userMarkerRef.current?.remove()
    userMarkerRef.current = null

    if (userLocation) {
      const icon = L.divIcon({
        className: '',
        html: buildUserMarkerHtml(22),
        iconSize: [22, 22],
        iconAnchor: [11, 11],
      })
      userMarkerRef.current = L.marker([userLocation.lat, userLocation.lng], { icon })
        .addTo(leafletMapRef.current)
      leafletMapRef.current.setView([userLocation.lat, userLocation.lng], 17, { animate: true })
    }
  }, [mapReady, userLocation])

  const resetView = () =>
    leafletMapRef.current?.setView(
      [STADIUM_CENTER.lat, STADIUM_CENTER.lng],
      STADIUM_DEFAULT_ZOOM,
      { animate: true }
    )

  return (
    <div className={`relative flex flex-col ${className}`}>
      <div ref={mapRef} className="w-full h-full rounded-xl overflow-hidden" style={{ minHeight: 560 }} />

      {!mapReady && (
        <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-card/80 backdrop-blur-sm z-10">
          <div className="flex flex-col items-center gap-3">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="text-sm font-medium text-muted-foreground">Loading OpenStreetMap…</p>
          </div>
        </div>
      )}

      <div className="absolute top-3 left-3 z-[1000] flex flex-col gap-2">
        <button onClick={onLocateUser} disabled={locating} title="Locate me"
          className="h-9 w-9 rounded-lg bg-card/90 backdrop-blur border border-border text-foreground shadow-md hover:bg-card transition-colors flex items-center justify-center text-base disabled:opacity-50">
          {locating ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" /> : '📍'}
        </button>
        <button onClick={resetView} title="Reset view"
          className="h-9 w-9 rounded-lg bg-card/90 backdrop-blur border border-border text-foreground shadow-md hover:bg-card transition-colors flex items-center justify-center text-base">
          🏟
        </button>
      </div>

      <div className="absolute top-3 right-12 z-[1000]">
        <LayerPanel layers={layers} onToggle={onLayerToggle} />
      </div>

      <style>{`
        .stadium-popup .leaflet-popup-content-wrapper{background:rgba(15,15,25,0.92);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.08);border-radius:12px;color:#fff;box-shadow:0 8px 32px rgba(0,0,0,0.5);}
        .stadium-popup .leaflet-popup-tip{background:rgba(15,15,25,0.92);}
        .stadium-popup .leaflet-popup-close-button{color:rgba(255,255,255,0.6);}
        .leaflet-control-zoom a{background:rgba(15,15,25,0.88)!important;color:#fff!important;border-color:rgba(255,255,255,0.08)!important;}
        .leaflet-control-attribution{background:rgba(15,15,25,0.7)!important;color:rgba(255,255,255,0.5)!important;font-size:10px!important;}
        .leaflet-control-attribution a{color:rgba(255,255,255,0.7)!important;}
        .leaflet-control-scale-line{background:rgba(15,15,25,0.7);color:rgba(255,255,255,0.7);border-color:rgba(255,255,255,0.3);}
      `}</style>
    </div>
  )
}

function buildPopupHtml(marker: MapMarker): string {
  const color = MARKER_COLOR[marker.category]
  let extra = ''

  if (marker.restroom) {
    const r = marker.restroom
    const cc = r.cleaningStatus === 'clean' ? '#10b981' : r.cleaningStatus === 'being_cleaned' ? '#f59e0b' : '#ef4444'
    extra = `<div style="margin-top:8px;display:grid;grid-template-columns:1fr 1fr;gap:4px;font-size:11px;">
      <div style="background:rgba(255,255,255,0.05);border-radius:6px;padding:6px;"><div style="color:rgba(255,255,255,0.5);margin-bottom:2px;">♂ Men</div><div style="font-weight:600;">${r.maleOccupancy} inside</div><div style="color:rgba(255,255,255,0.4);">${r.maleEntered} entered</div></div>
      <div style="background:rgba(255,255,255,0.05);border-radius:6px;padding:6px;"><div style="color:rgba(255,255,255,0.5);margin-bottom:2px;">♀ Women</div><div style="font-weight:600;">${r.femaleOccupancy} inside</div><div style="color:rgba(255,255,255,0.4);">${r.femaleEntered} entered</div></div>
    </div><div style="margin-top:6px;display:flex;gap:8px;font-size:11px;"><span style="color:${cc};">● ${r.cleaningStatus.replace('_',' ')}</span><span style="color:rgba(255,255,255,0.5);">Queue:${r.queueLength}</span><span style="color:rgba(255,255,255,0.5);">Water:${r.waterAvailable?'✓':'✗'}</span></div>`
  }

  if (marker.occupancy !== undefined && marker.capacity !== undefined) {
    const pct = Math.round((marker.occupancy / marker.capacity) * 100)
    const bc = pct > 80 ? '#ef4444' : pct > 60 ? '#f59e0b' : '#10b981'
    extra = `<div style="margin-top:8px;"><div style="display:flex;justify-content:space-between;font-size:11px;color:rgba(255,255,255,0.6);margin-bottom:4px;"><span>Occupancy</span><span>${marker.occupancy}/${marker.capacity}</span></div><div style="background:rgba(255,255,255,0.1);border-radius:4px;height:6px;overflow:hidden;"><div style="background:${bc};width:${pct}%;height:100%;border-radius:4px;"></div></div></div>`
  }

  const statusBadge = marker.status ? `<span style="margin-left:auto;padding:2px 8px;border-radius:999px;font-size:10px;font-weight:600;background:${marker.status==='open'||marker.status==='available'?'rgba(16,185,129,0.2)':'rgba(239,68,68,0.2)'};color:${marker.status==='open'||marker.status==='available'?'#10b981':'#ef4444'};border:1px solid ${marker.status==='open'||marker.status==='available'?'rgba(16,185,129,0.3)':'rgba(239,68,68,0.3)'};">${marker.status}</span>` : ''

  return `<div style="font-family:system-ui,sans-serif;min-width:200px;max-width:260px;">
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
      <div style="width:10px;height:10px;border-radius:50%;background:${color};flex-shrink:0;"></div>
      <div style="font-size:13px;font-weight:700;color:#fff;flex:1;">${marker.label}</div>
      ${statusBadge}
    </div>
    ${marker.description?`<p style="font-size:12px;color:rgba(255,255,255,0.55);margin:0 0 4px;">${marker.description}</p>`:''}
    ${extra}
  </div>`
}

function LayerPanel({ layers, onToggle }: { layers: MapLayer[]; onToggle: (id: MapLayerId) => void }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button onClick={() => setOpen(o => !o)}
        className="h-9 px-3 rounded-lg bg-card/90 backdrop-blur border border-border text-foreground text-xs font-semibold shadow-md hover:bg-card transition-colors flex items-center gap-1.5">
        <span>Layers</span><span className="text-muted-foreground">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="absolute top-11 right-0 w-52 rounded-xl bg-card/95 backdrop-blur-md border border-border shadow-2xl p-2 flex flex-col gap-1 z-[1001]">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-2 py-1">Map Layers</p>
          {layers.map(layer => (
            <button key={layer.id} onClick={() => onToggle(layer.id as MapLayerId)}
              className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium transition-colors ${layer.enabled ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted/50'}`}>
              <span>{layer.emoji}</span>
              <span className="flex-1 text-left">{layer.label}</span>
              <span className="h-4 w-4 rounded border-2 flex items-center justify-center flex-shrink-0"
                style={{ borderColor: layer.enabled ? layer.color : 'rgba(255,255,255,0.2)', background: layer.enabled ? `${layer.color}30` : 'transparent' }}>
                {layer.enabled && <span style={{ color: layer.color, fontSize: 9 }}>✓</span>}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
