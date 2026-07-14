export interface ParkingZone {
  id: string | number
  name: string
  available: number
  total: number
  status: 'available' | 'limited' | 'full'
}

export interface EnergyUsage {
  zone: string
  usage: number
  efficiency: number
  status: 'optimal' | 'warning' | 'critical'
}

export interface WaterUsage {
  zone: string
  consumption: number
  pressure: string
  quality: string
}

export interface SewageUsage {
  label: string
  value: string
  status: 'operational' | 'warning' | 'critical'
}
