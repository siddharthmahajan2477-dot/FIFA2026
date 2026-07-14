'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import type { OperationsUnit, OperationsCategory } from '@/types/map'
import {
  STADIUM_CENTER,
  OPERATIONS_UNITS,
  OSM_TILE_URL,
  OSM_ATTRIBUTION,
  buildOpsMarkerHtml,
  OPS_EMOJI,
  OPS_COLOR,
} from '@/lib/map-utils'
import { loadLeaflet } from '@/lib/leaflet-css'

interface OperationsMapProps { className?: string }

const CATEGORIES: OperationsCategory[] = ['security','medical','volunteer','maintenance','cleaning','ev','ambulance','fire','crowd','police']
const CATEGORY_LABELS: Record<OperationsCategory, string> = {
  security:'Security',medical:'Medical',volunteer:'Volunteers',maintenance:'Maintenance',
  cleaning:'Cleaning',ev:'EV Vehicles',ambulance:'Ambulance',fire:'Fire Units',crowd:'Crowd Mgmt',police:'Police',
}

function buildOpsPopupHtml(unit: OperationsUnit): string {
  const sc = unit.status==='active'?'#10b981':unit.status==='responding'?'#ef4444':'#eab308'
  return `<div style="font-family:system-ui,sans-serif;min-width:180px;">
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
      <span style="font-size:22px;">${OPS_EMOJI[unit.category]}</span>
      <div><div style="font-size:13px;font-weight:700;color:#fff;">${unit.callSign}</div><div style="font-size:11px;color:rgba(255,255,255,0.55);">${unit.label}</div></div>
    </div>
    <div style="display:flex;align-items:center;gap:6px;">
      <span style="width:8px;height:8px;border-radius:50%;background:${sc};flex-shrink:0;"></span>
      <span style="font-size:12px;color:${sc};font-weight:600;">${unit.status}</span>
      <span style="margin-left:auto;font-size:11px;color:rgba(255,255,255,0.4);">${unit.lastUpdate}</span>
    </div>
  </div>`
}

export default function OperationsMap({ className = '' }: OperationsMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const leafletMapRef = useRef<any>(null)
  const markersRef = useRef<Record<string, any>>({})
  const [mapReady, setMapReady] = useState(false)
  const [units, setUnits] = useState<OperationsUnit[]>(OPERATIONS_UNITS)
  const [activeCategories, setActiveCategories] = useState<Set<OperationsCategory>>(new Set(CATEGORIES))
  const [selectedUnit, setSelectedUnit] = useState<OperationsUnit | null>(null)

  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) return
    let cancelled = false

    loadLeaflet().then((L) => {
      if (cancelled || !mapRef.current || !L) return
      const map = L.map(mapRef.current, { center: [STADIUM_CENTER.lat, STADIUM_CENTER.lng], zoom: 17, zoomControl: false, attributionControl: false })
      L.tileLayer(OSM_TILE_URL, { attribution: OSM_ATTRIBUTION, maxZoom: 20 }).addTo(map)
      L.control.attribution({ position: 'bottomright', prefix: false }).addTo(map)
      L.control.zoom({ position: 'topright' }).addTo(map)
      leafletMapRef.current = map
      setMapReady(true)
    })

    return () => { cancelled = true; leafletMapRef.current?.remove(); leafletMapRef.current = null }
  }, [])

  useEffect(() => {
    if (!mapReady || !leafletMapRef.current) return
    const L = (window as any).L
    if (!L) return

    Object.values(markersRef.current).forEach(m => m.remove())
    markersRef.current = {}

    units.forEach((unit) => {
      if (!activeCategories.has(unit.category)) return
      const icon = L.divIcon({ className: '', html: buildOpsMarkerHtml(unit.category, 34), iconSize: [34, 34], iconAnchor: [17, 17], popupAnchor: [0, -20] })
      const lm = L.marker([unit.position.lat, unit.position.lng], { icon })
        .bindPopup(buildOpsPopupHtml(unit), { className: 'stadium-popup', maxWidth: 260 })
        .addTo(leafletMapRef.current)
      lm.on('click', () => setSelectedUnit(unit))
      markersRef.current[unit.id] = lm
    })
  }, [mapReady, units, activeCategories])

  useEffect(() => {
    const interval = setInterval(() => {
      setUnits(prev => prev.map(u => ({
        ...u,
        position: { lat: u.position.lat + (Math.random()-0.5)*0.0003, lng: u.position.lng + (Math.random()-0.5)*0.0003 },
        lastUpdate: 'just now',
      })))
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  const toggleCategory = useCallback((cat: OperationsCategory) => {
    setActiveCategories(prev => { const n = new Set(prev); n.has(cat)?n.delete(cat):n.add(cat); return n })
  }, [])

  const totalActive = units.filter(u => u.status==='active'||u.status==='responding').length

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[{label:'Total Units',value:units.length,color:'text-foreground'},{label:'Active',value:totalActive,color:'text-green-400'},{label:'Idle',value:units.filter(u=>u.status==='idle').length,color:'text-yellow-400'},{label:'Responding',value:units.filter(u=>u.status==='responding').length,color:'text-red-400'}].map(s=>(
          <div key={s.label} className="rounded-xl border border-border bg-card p-3">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="lg:w-52 flex-shrink-0">
          <div className="rounded-xl border border-border bg-card p-3 flex flex-col gap-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 px-1">Unit Categories</p>
            {CATEGORIES.map(cat => {
              const count = units.filter(u=>u.category===cat).length
              const isActive = activeCategories.has(cat)
              return (
                <button key={cat} onClick={()=>toggleCategory(cat)}
                  className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium transition-all ${isActive?'bg-primary/10 text-foreground':'text-muted-foreground hover:bg-muted/40 opacity-50'}`}>
                  <span>{OPS_EMOJI[cat]}</span>
                  <span className="flex-1 text-left">{CATEGORY_LABELS[cat]}</span>
                  <span className="h-5 w-5 rounded-full text-[10px] font-bold flex items-center justify-center flex-shrink-0"
                    style={{background:`${OPS_COLOR[cat]}30`,color:OPS_COLOR[cat]}}>{count}</span>
                </button>
              )
            })}
          </div>
          {selectedUnit && (
            <div className="mt-3 rounded-xl border border-border bg-card p-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{OPS_EMOJI[selectedUnit.category]}</span>
                <div><p className="text-xs font-bold text-foreground">{selectedUnit.callSign}</p><p className="text-[11px] text-muted-foreground">{selectedUnit.label}</p></div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                  style={{background:selectedUnit.status==='active'?'rgba(16,185,129,0.2)':selectedUnit.status==='responding'?'rgba(239,68,68,0.2)':'rgba(234,179,8,0.2)',color:selectedUnit.status==='active'?'#10b981':selectedUnit.status==='responding'?'#ef4444':'#eab308'}}>
                  {selectedUnit.status}</span>
                <span className="text-[11px] text-muted-foreground">{selectedUnit.lastUpdate}</span>
              </div>
              <button onClick={()=>setSelectedUnit(null)} className="mt-2 text-[11px] text-muted-foreground hover:text-foreground">× Deselect</button>
            </div>
          )}
        </div>

        <div className="relative flex-1 min-h-0">
          <div ref={mapRef} className="w-full rounded-xl overflow-hidden" style={{height:520}} />
          {!mapReady && (
            <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-card/80 backdrop-blur-sm z-10">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          )}
          <div className="absolute top-3 left-3 z-[1000] flex items-center gap-2 rounded-full bg-card/90 backdrop-blur px-3 py-1.5 border border-border text-xs font-semibold">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            Live Tracking
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="px-4 py-3 border-b border-border"><h3 className="text-sm font-bold text-foreground">Field Units</h3></div>
        <div className="divide-y divide-border max-h-64 overflow-y-auto">
          {units.filter(u=>activeCategories.has(u.category)).map(unit=>(
            <div key={unit.id} onClick={()=>{ setSelectedUnit(unit); if(leafletMapRef.current){leafletMapRef.current.setView([unit.position.lat,unit.position.lng],18,{animate:true}); markersRef.current[unit.id]?.openPopup()} }}
              className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-muted/30 transition-colors">
              <span className="text-lg">{OPS_EMOJI[unit.category]}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground truncate">{unit.label}</p>
                <p className="text-[11px] text-muted-foreground">{unit.callSign} · {unit.lastUpdate}</p>
              </div>
              <span className="flex-shrink-0 h-2 w-2 rounded-full"
                style={{background:unit.status==='active'?'#10b981':unit.status==='responding'?'#ef4444':'#eab308',boxShadow:`0 0 6px ${unit.status==='active'?'#10b981':unit.status==='responding'?'#ef4444':'#eab308'}`}} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .stadium-popup .leaflet-popup-content-wrapper{background:rgba(15,15,25,0.92);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.08);border-radius:12px;color:#fff;}
        .stadium-popup .leaflet-popup-tip{background:rgba(15,15,25,0.92);}
        .stadium-popup .leaflet-popup-close-button{color:rgba(255,255,255,0.5);}
        .leaflet-control-zoom a{background:rgba(15,15,25,0.88)!important;color:#fff!important;border-color:rgba(255,255,255,0.08)!important;}
      `}</style>
    </div>
  )
}
