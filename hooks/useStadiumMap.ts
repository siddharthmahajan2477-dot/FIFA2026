// ─── useStadiumMap Hook ────────────────────────────────────────────────────────
// Manages map state: selected marker, active layers, user location, navigation

import { useState, useCallback, useEffect } from 'react'
import {
  STADIUM_MARKERS,
  DEFAULT_LAYERS,
  STADIUM_CENTER,
  CATEGORY_LAYER,
} from '@/lib/map-utils'
import type {
  MapMarker,
  MapLayer,
  MapLayerId,
  LatLng,
  MarkerCategory,
} from '@/types/map'

export function useStadiumMap() {
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null)
  const [layers, setLayers] = useState<MapLayer[]>(DEFAULT_LAYERS)
  const [userLocation, setUserLocation] = useState<LatLng | null>(null)
  const [locating, setLocating] = useState(false)
  const [activeCategories, setActiveCategories] = useState<MarkerCategory[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  // Filtered markers based on active layers and search
  const visibleMarkers = STADIUM_MARKERS.filter((marker) => {
    const layerId = CATEGORY_LAYER[marker.category]
    const layer = layerId ? layers.find((l) => l.id === layerId) : null

    // If no layer mapping, always show (entrances, gates, info, etc.)
    if (layerId && layer && !layer.enabled) return false

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      return (
        marker.label.toLowerCase().includes(q) ||
        marker.description?.toLowerCase().includes(q) ||
        marker.category.includes(q)
      )
    }

    return true
  })

  const toggleLayer = useCallback((id: MapLayerId) => {
    setLayers((prev) =>
      prev.map((l) => (l.id === id ? { ...l, enabled: !l.enabled } : l))
    )
  }, [])

  const locateUser = useCallback(() => {
    if (!navigator.geolocation) return
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        setLocating(false)
      },
      () => {
        console.error('Failed to retrieve user location.')
        setLocating(false)
      },
      { timeout: 6000 }
    )
  }, [])

  const clearUserLocation = useCallback(() => setUserLocation(null), [])

  return {
    selectedMarker,
    setSelectedMarker,
    layers,
    toggleLayer,
    visibleMarkers,
    allMarkers: STADIUM_MARKERS,
    userLocation,
    locating,
    locateUser,
    clearUserLocation,
    searchQuery,
    setSearchQuery,
  }
}
