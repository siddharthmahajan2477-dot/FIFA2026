export interface Volunteer {
  id: string | number
  name: string
  role: string
  shift: string
  location: string
  status: 'active' | 'break' | 'idle'
  lastUpdate?: string
}

export interface MedicalIncident {
  id: string
  title: string
  description: string
  location: string
  time: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  status: 'active' | 'resolved' | 'pending'
  assignedTo: string
}

export interface SecurityIncident {
  id: string
  title: string
  description: string
  location: string
  time: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  status: 'active' | 'resolved' | 'pending'
  assignedTo: string
}

export interface SanitationStats {
  occupancy: number
  capacity: number
  entered: number
  exited: number
  queue: number
  avgWait: string
  usagePct: string
  status: string
}
