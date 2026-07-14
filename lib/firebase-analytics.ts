// ─── Firebase Analytics Events ────────────────────────────────────────────────
// Typed event helpers for the Smart Stadium OS.
// Import and call these anywhere — they silently no-op on the server.

import { getFirebaseAnalytics } from '@/lib/firebase'

// Generic event logger — all helpers below call this
async function logEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window === 'undefined') return
  try {
    const analytics = await getFirebaseAnalytics()
    if (!analytics) return
    const { logEvent: fbLogEvent } = await import('firebase/analytics')
    fbLogEvent(analytics, eventName, params)
  } catch {
    // Analytics should never crash the app
  }
}

// ── Stadium Navigation ────────────────────────────────────────────────────────
export const trackMapOpen = (view: 'stadium' | 'navigation' | 'indoor') =>
  logEvent('map_view_open', { view })

export const trackMarkerClick = (markerId: string, category: string, label: string) =>
  logEvent('marker_click', { marker_id: markerId, category, label })

export const trackNavRoute = (originId: string, destId: string) =>
  logEvent('navigation_route', { origin: originId, destination: destId })

export const trackLocateMe = () =>
  logEvent('locate_me_click')

// ── Fan Experience ────────────────────────────────────────────────────────────
export const trackTicketView = (matchId: string) =>
  logEvent('ticket_view', { match_id: matchId })

export const trackFoodOrder = (venueId: string, total: number) =>
  logEvent('food_order', { venue_id: venueId, order_total: total })

export const trackMerchandiseBrowse = (category: string) =>
  logEvent('merchandise_browse', { category })

export const trackMerchandisePurchase = (itemId: string, price: number) =>
  logEvent('purchase', { currency: 'USD', value: price, items: [{ item_id: itemId }] })

// ── Operations ────────────────────────────────────────────────────────────────
export const trackIncidentCreate = (type: string, severity: string) =>
  logEvent('incident_create', { incident_type: type, severity })

export const trackUnitDispatch = (unitId: string, category: string) =>
  logEvent('unit_dispatch', { unit_id: unitId, category })

// ── AI Features ───────────────────────────────────────────────────────────────
export const trackAIQuery = (module: string, provider: string) =>
  logEvent('ai_query', { module, provider })

export const trackAICommandCenter = (command: string) =>
  logEvent('ai_command', { command })

// ── Auth ─────────────────────────────────────────────────────────────────────
export const trackLogin = (method: string) =>
  logEvent('login', { method })

export const trackSignUp = (method: string) =>
  logEvent('sign_up', { method })

export const trackLogout = () =>
  logEvent('logout')

// ── Page views — use in layout if not using GA auto page_view ────────────────
export const trackPageView = (pageName: string, pageLocation?: string) =>
  logEvent('page_view', { page_title: pageName, page_location: pageLocation ?? window.location.href })
