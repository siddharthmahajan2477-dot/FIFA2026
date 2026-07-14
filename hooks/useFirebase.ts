// ─── Firebase Hooks ───────────────────────────────────────────────────────────
// Reusable React hooks for Firebase services
// FIFA World Cup 2026 Smart Stadium Operating System

'use client'

import { useState, useEffect } from 'react'

// ── useFirebaseAnalytics ──────────────────────────────────────────────────────
// Initializes Analytics once on mount and logs a page_view event.
export function useFirebaseAnalytics() {
  const [analytics, setAnalytics] = useState<any>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    import('@/lib/firebase').then(({ getFirebaseAnalytics }) => {
      getFirebaseAnalytics()?.then((instance: any) => {
        if (instance) {
          setAnalytics(instance)
        }
      })
    })
  }, [])

  return analytics
}

// ── useFirebaseAuth ───────────────────────────────────────────────────────────
// Subscribes to the Firebase auth state and returns the current user.
export function useFirebaseAuth() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let unsubscribe: (() => void) | undefined

    import('@/lib/firebase').then(({ auth }) => {
      import('firebase/auth').then(({ onAuthStateChanged }) => {
        unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
          setUser(firebaseUser)
          setLoading(false)
        })
      })
    })

    return () => unsubscribe?.()
  }, [])

  return { user, loading }
}

// ── useFirebaseMessaging ──────────────────────────────────────────────────────
// Requests notification permission and returns the FCM token.
export function useFirebaseMessaging(vapidKey?: string) {
  const [token, setToken] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (Notification.permission === 'denied') {
      setError('Notification permission denied')
      return
    }

    import('@/lib/firebase').then(({ getFirebaseMessaging }) => {
      getFirebaseMessaging()?.then(async (messaging: any) => {
        if (!messaging) return
        try {
          const { getToken } = await import('firebase/messaging')
          const fcmToken = await getToken(messaging, {
            vapidKey: vapidKey || process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
          })
          setToken(fcmToken)
        } catch (err: any) {
          setError(err.message)
        }
      })
    })
  }, [vapidKey])

  return { token, error }
}
