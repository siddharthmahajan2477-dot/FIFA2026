'use client'

import { useEffect } from 'react'
import { useFirebaseAnalytics } from '@/hooks/useFirebase'

export function FirebaseProvider() {
  // Initialize analytics on mount
  useFirebaseAnalytics()

  return null
}
