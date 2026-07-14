export const APP_NAME = 'FIFA World Cup 2026 Smart Stadium Operating System'
export const APP_DESCRIPTION =
  'Complete fan experience and stadium operations platform for FIFA World Cup 2026'
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export const NAV_ITEMS = [
  { label: 'Dashboard', href: '/fan-dashboard' },
  { label: 'Match Center', href: '/match-center' },
  { label: 'Teams', href: '/team-analytics' },
  { label: 'Players', href: '/player-analytics' },
  { label: 'Tournaments', href: '/tournament-center' },
  { label: 'Tickets', href: '/tickets' },
]

export const STATUS_COLORS = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-800',
  pending: 'bg-yellow-100 text-yellow-800',
  error: 'bg-red-100 text-red-800',
} as const

export const PRIORITY_COLORS = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-orange-100 text-orange-800',
  critical: 'bg-red-100 text-red-800',
} as const

export const TIMEZONE_OPTIONS = [
  { label: 'UTC', value: 'UTC' },
  { label: 'Eastern Time', value: 'America/New_York' },
  { label: 'Central Time', value: 'America/Chicago' },
  { label: 'Mountain Time', value: 'America/Denver' },
  { label: 'Pacific Time', value: 'America/Los_Angeles' },
] as const

export const LANGUAGE_OPTIONS = [
  { label: 'English', value: 'en' },
  { label: 'Spanish', value: 'es' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
  { label: 'Portuguese', value: 'pt' },
] as const

export const PAGINATION_DEFAULTS = {
  PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const

export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const

export const BREAKPOINTS = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const
