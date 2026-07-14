// ─── Firebase Auth Context Provider ──────────────────────────────────────────
// Manages application authentication context, token refreshes, and state syncs

'use client'

import React, { createContext, useState, useEffect, useContext } from 'react'
import { auth } from '@/lib/firebase'
import {
  onIdTokenChanged,
  sendEmailVerification,
  type User as FirebaseUser
} from 'firebase/auth'
import { AuthService, type SyncProfileData } from '@/services/auth'
import type { UserProfile } from '@/types/user'

interface AuthContextType {
  user: UserProfile | null
  loading: boolean
  error: string | null
  signUpWithEmail: (email: string, password: string, profileData: SyncProfileData) => Promise<UserProfile>
  signInWithEmail: (email: string, password: string) => Promise<UserProfile>
  signInWithGoogle: () => Promise<UserProfile>
  logout: () => Promise<void>
  sendPasswordReset: (email: string) => Promise<void>
  resendVerificationEmail: () => Promise<void>
  checkEmailVerification: () => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check initial local storage for faster UI paint
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('currentUser')
      if (cached) {
        try {
          setUser(JSON.parse(cached))
        } catch {}
      }
    }

    // Subscribe to id token updates (handles login, logout, automatic token refresh)
    const unsubscribe = onIdTokenChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      setLoading(true)
      if (firebaseUser) {
        try {
          // If email is not verified, we can still load the user but we will restrict features or handle it in UI
          const profile = await AuthService.syncUserProfile(firebaseUser)
          setUser(profile)
          localStorage.setItem('currentUser', JSON.stringify(profile))
        } catch (err: any) {
          setError(err.message || 'Error syncing user profile')
          setUser(null)
          localStorage.removeItem('currentUser')
        }
      } else {
        setUser(null)
        localStorage.removeItem('currentUser')
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signUpWithEmail = async (email: string, password: string, profileData: SyncProfileData) => {
    setError(null)
    setLoading(true)
    try {
      const u = await AuthService.signUp(email, password, profileData)
      return u
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const signInWithEmail = async (email: string, password: string) => {
    setError(null)
    setLoading(true)
    try {
      const u = await AuthService.login(email, password)
      return u
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const signInWithGoogle = async () => {
    setError(null)
    setLoading(true)
    try {
      const u = await AuthService.loginWithGoogle()
      return u
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    try {
      await AuthService.logout()
      setUser(null)
      localStorage.removeItem('currentUser')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const sendPasswordReset = async (email: string) => {
    await AuthService.sendPasswordReset(email)
  }

  const resendVerificationEmail = async () => {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser)
    }
  }

  const checkEmailVerification = async (): Promise<boolean> => {
    if (auth.currentUser) {
      await auth.currentUser.reload()
      const isVerified = auth.currentUser.emailVerified
      if (isVerified && user) {
        // Trigger a profile sync once verified
        const updated = await AuthService.syncUserProfile(auth.currentUser)
        setUser(updated)
      }
      return isVerified
    }
    return false
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        signUpWithEmail,
        signInWithEmail,
        signInWithGoogle,
        logout,
        sendPasswordReset,
        resendVerificationEmail,
        checkEmailVerification,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return ctx
}
