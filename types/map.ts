// ─── Map Types ───────────────────────────────────────────────────────────────
// FIFA World Cup 2026 Smart Stadium OS — Stadium Navigation & Operations Maps

export type MarkerCategory =
  | 'entrance'
  | 'gate'
  | 'ticket'
  | 'seating'
  | 'food'
  | 'restaurant'
  | 'merchandise'
  | 'restroom_male'
  | 'restroom_female'
  | 'restroom_accessible'
  | 'medical'
  | 'fire'
  | 'security'
  | 'emergency_exit'
  | 'parking'
  | 'bus'
  | 'taxi'
  | 'metro'
  | 'charging'
  | 'atm'
  | 'info'
  | 'user_location'

export type OperationsCategory =
  | 'security'
  | 'medical'
  | 'volunteer'
  | 'maintenance'
  | 'cleaning'
  | 'ev'
  | 'ambulance'
  | 'fire'
  | 'crowd'
  | 'police'

export type MapLayerId =
  | 'crowd'
  | 'parking'
  | 'security'
  | 'medical'
  | 'food'
  | 'restrooms'
  | 'transport'
  | 'emergency'
  | 'infrastructure'
  | 'utilities'

export interface LatLng {
  lat: number
  lng: number
}

export interface MapMarker {
  id: string
  category: MarkerCategory
  label: string
  description?: string
  position: LatLng
  // Restroom-specific
  restroom?: RestroomData
  // Generic metadata
  status?: 'open' | 'closed' | 'full' | 'busy' | 'available'
  occupancy?: number
  capacity?: number
}

export interface RestroomData {
  maleEntered: number
  maleExited: number
  maleOccupancy: number
  femaleEntered: number
  femaleExited: number
  femaleOccupancy: number
  cleaningStatus: 'clean' | 'needs_cleaning' | 'being_cleaned'
  waterAvailable: boolean
  queueLength: number
}

export interface OperationsUnit {
  id: string
  category: OperationsCategory
  label: string
  callSign: string
  position: LatLng
  status: 'active' | 'idle' | 'responding' | 'offline'
  lastUpdate: string
}

export interface MapLayer {
  id: MapLayerId
  label: string
  emoji: string
  enabled: boolean
  color: string
}

export interface NavigationStep {
  from: string
  to: string
  instruction: string
  distance: string
  duration: string
  waypoints: LatLng[]
}

export interface NavigationRoute {
  steps: NavigationStep[]
  totalDistance: string
  totalDuration: string
  waypoints: LatLng[]
}
