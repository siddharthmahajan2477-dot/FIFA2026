// Common types used throughout the application

export type Status = 'active' | 'inactive' | 'pending' | 'error'
export type Priority = 'low' | 'medium' | 'high' | 'critical'
export type Role = 'admin' | 'organizer' | 'staff' | 'user' | 'guest'

export interface User {
  id: string
  name: string
  email: string
  role: Role
  avatar?: string
  createdAt: Date
}

export interface Match {
  id: string
  homeTeam: string
  awayTeam: string
  homeScore: number
  awayScore: number
  status: 'scheduled' | 'live' | 'finished'
  startTime: Date
  venue: string
}

export interface Team {
  id: string
  name: string
  code: string
  logo?: string
  wins: number
  draws: number
  losses: number
  goalsFor: number
  goalsAgainst: number
}

export interface Player {
  id: string
  name: string
  number: number
  position: string
  teamId: string
  goals: number
  assists: number
  rating?: number
}

export interface Ticket {
  id: string
  userId: string
  matchId: string
  seatNumber: string
  section: string
  price: number
  status: 'active' | 'used' | 'cancelled'
  purchasedAt: Date
}

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  createdAt: Date
}

export interface Incident {
  id: string
  title: string
  description: string
  severity: Priority
  status: Status
  location?: string
  reportedAt: Date
  resolvedAt?: Date
}

export interface Report {
  id: string
  title: string
  type: 'daily' | 'weekly' | 'monthly' | 'quarterly'
  generatedAt: Date
  data: Record<string, unknown>
}

export interface ApiResponse<T> {
  data: T
  status: 'success' | 'error'
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}
