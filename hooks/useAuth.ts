// ─── useAuth Hook ────────────────────────────────────────────────────────────
// FIFA World Cup 2026 Smart Stadium Operating System
// Consumes the centralized AuthContext provider.

'use client'

import { useAuthContext } from '@/context/AuthProvider'

export function useAuth() {
  const { user, loading, error, logout } = useAuthContext()

  return {
    user,
    loading,
    error,
    logout,
  }
}
