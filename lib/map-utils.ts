// ─── Map Utilities & Data ─────────────────────────────────────────────────────
// FIFA World Cup 2026 Smart Stadium OS
// MetLife Stadium: 40.8135° N, 74.0745° W

import type {
  MapMarker,
  OperationsUnit,
  MapLayer,
  MarkerCategory,
  OperationsCategory,
  LatLng,
} from '@/types/map'

// ── Stadium Center ────────────────────────────────────────────────────────────
export const STADIUM_CENTER: LatLng = { lat: 40.8135, lng: -74.0745 }
export const STADIUM_DEFAULT_ZOOM = 17
export const STADIUM_MIN_ZOOM = 14
export const STADIUM_MAX_ZOOM = 20

// ── OpenStreetMap Tile URL ────────────────────────────────────────────────────
export const OSM_TILE_URL =
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
export const OSM_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

// ── Marker Emoji Map ──────────────────────────────────────────────────────────
export const MARKER_EMOJI: Record<MarkerCategory, string> = {
  entrance: '🏟',
  gate: '🚪',
  ticket: '🎟',
  seating: '🪑',
  food: '🍔',
  restaurant: '☕',
  merchandise: '🛍',
  restroom_male: '🚻',
  restroom_female: '🚻',
  restroom_accessible: '♿',
  medical: '🚑',
  fire: '🚒',
  security: '🚓',
  emergency_exit: '🚨',
  parking: '🚗',
  bus: '🚌',
  taxi: '🚖',
  metro: '🚇',
  charging: '🔋',
  atm: '🏧',
  info: 'ℹ',
  user_location: '📍',
}

export const MARKER_COLOR: Record<MarkerCategory, string> = {
  entrance: '#6366f1',
  gate: '#8b5cf6',
  ticket: '#a78bfa',
  seating: '#3b82f6',
  food: '#f97316',
  restaurant: '#f59e0b',
  merchandise: '#ec4899',
  restroom_male: '#06b6d4',
  restroom_female: '#f472b6',
  restroom_accessible: '#10b981',
  medical: '#ef4444',
  fire: '#f97316',
  security: '#1d4ed8',
  emergency_exit: '#dc2626',
  parking: '#64748b',
  bus: '#16a34a',
  taxi: '#ca8a04',
  metro: '#7c3aed',
  charging: '#10b981',
  atm: '#0ea5e9',
  info: '#14b8a6',
  user_location: '#3b82f6',
}

export const OPS_EMOJI: Record<OperationsCategory, string> = {
  security: '🛡',
  medical: '🏥',
  volunteer: '🟡',
  maintenance: '🔧',
  cleaning: '🧹',
  ev: '⚡',
  ambulance: '🚑',
  fire: '🚒',
  crowd: '📢',
  police: '👮',
}

export const OPS_COLOR: Record<OperationsCategory, string> = {
  security: '#1d4ed8',
  medical: '#ef4444',
  volunteer: '#f59e0b',
  maintenance: '#78716c',
  cleaning: '#10b981',
  ev: '#22c55e',
  ambulance: '#dc2626',
  fire: '#ea580c',
  crowd: '#8b5cf6',
  police: '#1e40af',
}

// ── Stadium Markers ───────────────────────────────────────────────────────────
// Positions offset from stadium center to simulate realistic placement
function offset(lat: number, lng: number): LatLng {
  return { lat: STADIUM_CENTER.lat + lat, lng: STADIUM_CENTER.lng + lng }
}

export const STADIUM_MARKERS: MapMarker[] = [
  // Entrances
  { id: 'ent-main', category: 'entrance', label: 'Main Entrance', description: 'VIP & Media entrance', position: offset(0.003, 0), status: 'open' },
  { id: 'ent-south', category: 'entrance', label: 'South Entrance', description: 'General admission', position: offset(-0.003, 0), status: 'open' },

  // Gates
  { id: 'gate-a', category: 'gate', label: 'Gate A', description: 'Sections 101–110', position: offset(0.002, -0.004), status: 'open' },
  { id: 'gate-b', category: 'gate', label: 'Gate B', description: 'Sections 111–120', position: offset(0.002, 0.004), status: 'open' },
  { id: 'gate-c', category: 'gate', label: 'Gate C', description: 'Sections 121–130', position: offset(-0.002, 0.004), status: 'open' },
  { id: 'gate-d', category: 'gate', label: 'Gate D', description: 'Sections 131–140', position: offset(-0.002, -0.004), status: 'open' },

  // Ticket Validation
  { id: 'ticket-1', category: 'ticket', label: 'Ticket Validation North', position: offset(0.0025, -0.002), status: 'open' },
  { id: 'ticket-2', category: 'ticket', label: 'Ticket Validation South', position: offset(-0.0025, 0.002), status: 'open' },

  // Seating
  { id: 'seat-vip', category: 'seating', label: 'VIP Lounge', description: 'Premium seating area', position: offset(0.0005, 0), status: 'available' },
  { id: 'seat-101', category: 'seating', label: 'Section 101', position: offset(0.001, -0.002) },
  { id: 'seat-120', category: 'seating', label: 'Section 120', position: offset(0.001, 0.002) },

  // Food Courts
  { id: 'food-1', category: 'food', label: 'Food Court Alpha', description: 'Burgers · Pizza · Fries', position: offset(0.0015, -0.003), status: 'open', occupancy: 65, capacity: 200 },
  { id: 'food-2', category: 'food', label: 'Food Court Beta', description: 'Hot dogs · Nachos · Pretzels', position: offset(-0.0015, 0.003), status: 'open', occupancy: 80, capacity: 200 },
  { id: 'food-3', category: 'food', label: 'Food Court Gamma', description: 'International cuisine', position: offset(0.0015, 0.003), status: 'open', occupancy: 45, capacity: 200 },

  // Restaurants
  { id: 'rest-1', category: 'restaurant', label: 'Champions Lounge', description: 'Sit-down restaurant', position: offset(0.002, 0.001), status: 'open' },
  { id: 'rest-2', category: 'restaurant', label: 'Café 2026', description: 'Coffee & pastries', position: offset(-0.002, -0.001), status: 'open' },

  // Merchandise
  { id: 'merch-1', category: 'merchandise', label: 'Official Store North', description: 'FIFA merchandise', position: offset(0.0025, 0.002), status: 'open' },
  { id: 'merch-2', category: 'merchandise', label: 'Official Store South', position: offset(-0.0025, -0.002), status: 'open' },

  // Restrooms
  {
    id: 'wc-n1', category: 'restroom_male', label: 'North Restroom Block A',
    position: offset(0.002, -0.001),
    restroom: { maleEntered: 340, maleExited: 310, maleOccupancy: 30, femaleEntered: 280, femaleExited: 265, femaleOccupancy: 15, cleaningStatus: 'clean', waterAvailable: true, queueLength: 0 }
  },
  {
    id: 'wc-s1', category: 'restroom_female', label: 'South Restroom Block B',
    position: offset(-0.002, 0.001),
    restroom: { maleEntered: 190, maleExited: 185, maleOccupancy: 5, femaleEntered: 410, femaleExited: 390, femaleOccupancy: 20, cleaningStatus: 'being_cleaned', waterAvailable: true, queueLength: 4 }
  },
  {
    id: 'wc-acc', category: 'restroom_accessible', label: 'Accessible Restroom',
    position: offset(0, 0.003),
    restroom: { maleEntered: 45, maleExited: 43, maleOccupancy: 2, femaleEntered: 38, femaleExited: 38, femaleOccupancy: 0, cleaningStatus: 'clean', waterAvailable: true, queueLength: 0 }
  },

  // Medical
  { id: 'med-1', category: 'medical', label: 'Medical Center A', description: 'First aid & emergency', position: offset(0.003, -0.002), status: 'open' },
  { id: 'med-2', category: 'medical', label: 'Medical Center B', position: offset(-0.003, 0.002), status: 'open' },

  // Fire Station
  { id: 'fire-1', category: 'fire', label: 'Fire Response Station', description: 'Emergency fire unit', position: offset(0.004, 0), status: 'available' },

  // Security
  { id: 'sec-1', category: 'security', label: 'Security Command', description: 'Main security hub', position: offset(-0.001, -0.004), status: 'open' },
  { id: 'sec-2', category: 'security', label: 'Security Post B', position: offset(0.001, 0.004), status: 'open' },

  // Emergency Exits
  { id: 'exit-1', category: 'emergency_exit', label: 'Emergency Exit 1', position: offset(0.003, -0.003) },
  { id: 'exit-2', category: 'emergency_exit', label: 'Emergency Exit 2', position: offset(-0.003, 0.003) },
  { id: 'exit-3', category: 'emergency_exit', label: 'Emergency Exit 3', position: offset(0.003, 0.003) },
  { id: 'exit-4', category: 'emergency_exit', label: 'Emergency Exit 4', position: offset(-0.003, -0.003) },

  // Parking
  { id: 'park-1', category: 'parking', label: 'Parking Lot P1', description: '450 spaces · 78% full', position: offset(0.006, -0.005), occupancy: 351, capacity: 450 },
  { id: 'park-2', category: 'parking', label: 'Parking Lot P2', description: '600 spaces · 52% full', position: offset(-0.006, -0.005), occupancy: 312, capacity: 600 },
  { id: 'park-3', category: 'parking', label: 'Parking Lot P3', description: '350 spaces · 91% full', position: offset(0.006, 0.005), occupancy: 318, capacity: 350 },

  // Transport
  { id: 'bus-1', category: 'bus', label: 'Bus Terminal A', description: 'Routes 101, 102, 140', position: offset(0.007, 0), status: 'open' },
  { id: 'taxi-1', category: 'taxi', label: 'Taxi Pickup Zone', description: 'Rideshare & taxi', position: offset(-0.007, 0), status: 'open' },
  { id: 'metro-1', category: 'metro', label: 'Meadowlands Station', description: 'NJ Transit rail', position: offset(0, -0.008), status: 'open' },

  // Utilities
  { id: 'charge-1', category: 'charging', label: 'Charging Station A', position: offset(0.004, 0.003) },
  { id: 'charge-2', category: 'charging', label: 'Charging Station B', position: offset(-0.004, -0.003) },
  { id: 'atm-1', category: 'atm', label: 'ATM Bank A', position: offset(0.0015, -0.0035) },
  { id: 'atm-2', category: 'atm', label: 'ATM Bank B', position: offset(-0.0015, 0.0035) },
  { id: 'info-1', category: 'info', label: 'Information Desk North', description: 'Fan assistance', position: offset(0.0025, 0) },
  { id: 'info-2', category: 'info', label: 'Information Desk South', description: 'Fan assistance', position: offset(-0.0025, 0) },
]

// ── Operations Units ──────────────────────────────────────────────────────────
export const OPERATIONS_UNITS: OperationsUnit[] = [
  { id: 'sec-t1', category: 'security', label: 'Security Team Alpha', callSign: 'SEC-A', position: offset(0.001, -0.002), status: 'active', lastUpdate: '30s ago' },
  { id: 'sec-t2', category: 'security', label: 'Security Team Bravo', callSign: 'SEC-B', position: offset(-0.001, 0.002), status: 'active', lastUpdate: '1m ago' },
  { id: 'med-t1', category: 'medical', label: 'Medical Unit 1', callSign: 'MED-1', position: offset(0.002, 0.001), status: 'active', lastUpdate: '15s ago' },
  { id: 'amb-1', category: 'ambulance', label: 'Ambulance Delta', callSign: 'AMB-D', position: offset(-0.002, -0.001), status: 'idle', lastUpdate: '2m ago' },
  { id: 'vol-t1', category: 'volunteer', label: 'Volunteer Squad 3', callSign: 'VOL-3', position: offset(0.0015, 0.003), status: 'active', lastUpdate: '45s ago' },
  { id: 'vol-t2', category: 'volunteer', label: 'Volunteer Squad 7', callSign: 'VOL-7', position: offset(-0.0015, -0.003), status: 'active', lastUpdate: '1m ago' },
  { id: 'maint-1', category: 'maintenance', label: 'Maintenance Crew A', callSign: 'MAINT-A', position: offset(0.003, -0.001), status: 'responding', lastUpdate: '10s ago' },
  { id: 'clean-1', category: 'cleaning', label: 'Cleaning Unit 2', callSign: 'CLN-2', position: offset(-0.003, 0.001), status: 'active', lastUpdate: '20s ago' },
  { id: 'ev-1', category: 'ev', label: 'EV Patrol Vehicle', callSign: 'EV-1', position: offset(0.002, -0.003), status: 'active', lastUpdate: '5s ago' },
  { id: 'fire-t1', category: 'fire', label: 'Fire Response Unit', callSign: 'FIRE-1', position: offset(0.004, 0.001), status: 'idle', lastUpdate: '3m ago' },
  { id: 'crowd-1', category: 'crowd', label: 'Crowd Manager North', callSign: 'CROWD-N', position: offset(0.003, 0.002), status: 'active', lastUpdate: '30s ago' },
  { id: 'police-1', category: 'police', label: 'Police Unit 12', callSign: 'PD-12', position: offset(-0.003, -0.002), status: 'active', lastUpdate: '45s ago' },
]

// ── Map Layers ────────────────────────────────────────────────────────────────
export const DEFAULT_LAYERS: MapLayer[] = [
  { id: 'crowd', label: 'Crowd Density', emoji: '👥', enabled: false, color: '#f97316' },
  { id: 'parking', label: 'Parking', emoji: '🚗', enabled: true, color: '#64748b' },
  { id: 'security', label: 'Security', emoji: '🛡', enabled: false, color: '#1d4ed8' },
  { id: 'medical', label: 'Medical', emoji: '🏥', enabled: true, color: '#ef4444' },
  { id: 'food', label: 'Food & Dining', emoji: '🍔', enabled: true, color: '#f97316' },
  { id: 'restrooms', label: 'Restrooms', emoji: '🚻', enabled: true, color: '#06b6d4' },
  { id: 'transport', label: 'Transport', emoji: '🚌', enabled: true, color: '#16a34a' },
  { id: 'emergency', label: 'Emergency', emoji: '🚨', enabled: true, color: '#dc2626' },
  { id: 'infrastructure', label: 'Infrastructure', emoji: '⚙️', enabled: false, color: '#78716c' },
  { id: 'utilities', label: 'Utilities', emoji: '🔋', enabled: false, color: '#10b981' },
]

// ── Category → Layer mapping ──────────────────────────────────────────────────
export const CATEGORY_LAYER: Partial<Record<MarkerCategory, string>> = {
  parking: 'parking',
  security: 'security',
  medical: 'medical',
  fire: 'emergency',
  emergency_exit: 'emergency',
  food: 'food',
  restaurant: 'food',
  restroom_male: 'restrooms',
  restroom_female: 'restrooms',
  restroom_accessible: 'restrooms',
  bus: 'transport',
  taxi: 'transport',
  metro: 'transport',
  charging: 'utilities',
  atm: 'utilities',
}

// ── Helper: build Leaflet divIcon HTML for a marker ──────────────────────────
export function buildMarkerHtml(category: MarkerCategory, size = 36): string {
  const emoji = MARKER_EMOJI[category]
  const color = MARKER_COLOR[category]
  return `
    <div style="
      width:${size}px;height:${size}px;
      border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);
      background:${color};
      border:2px solid rgba(255,255,255,0.8);
      box-shadow:0 2px 8px rgba(0,0,0,0.4);
      display:flex;align-items:center;justify-content:center;
    ">
      <span style="transform:rotate(45deg);font-size:${Math.round(size * 0.45)}px;line-height:1;">
        ${emoji}
      </span>
    </div>`
}

export function buildOpsMarkerHtml(category: OperationsCategory, size = 32): string {
  const emoji = OPS_EMOJI[category]
  const color = OPS_COLOR[category]
  return `
    <div style="
      width:${size}px;height:${size}px;
      border-radius:50%;
      background:${color};
      border:2px solid rgba(255,255,255,0.9);
      box-shadow:0 0 0 4px ${color}40,0 2px 8px rgba(0,0,0,0.5);
      display:flex;align-items:center;justify-content:center;
      animation:pulse 2s infinite;
    ">
      <span style="font-size:${Math.round(size * 0.5)}px;line-height:1;">${emoji}</span>
    </div>`
}

export function buildUserMarkerHtml(size = 24): string {
  return `
    <div style="
      width:${size}px;height:${size}px;border-radius:50%;
      background:#3b82f6;
      border:3px solid #fff;
      box-shadow:0 0 0 6px rgba(59,130,246,0.3),0 0 0 12px rgba(59,130,246,0.1);
    "></div>`
}
