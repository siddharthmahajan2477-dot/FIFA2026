// ─── Firebase Frontend Auth Service ──────────────────────────────────────────
// Bridging Firebase Identity Provider with PostgreSQL database

import {
  auth,
  googleProvider,
  EmailAuthProvider,
} from '@/lib/firebase'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  type User as FirebaseUser,
} from 'firebase/auth'
import type { UserProfile } from '@/types/user'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'

export interface SyncProfileData {
  username?: string
  display_name?: string
  country?: string
  favorite_team?: string
  favorite_club?: string
  language?: string
  role?: string
}

export class AuthService {
  /**
   * Syncs the authenticated Firebase user with the PostgreSQL backend.
   */
  static async syncUserProfile(firebaseUser: FirebaseUser, extraData?: SyncProfileData): Promise<UserProfile> {
    const token = await firebaseUser.getIdToken()
    
    // Fallback initials and details
    const name = extraData?.display_name || firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Fan'
    const payload = {
      username: extraData?.username || firebaseUser.email?.split('@')[0] || `user_${firebaseUser.uid.substring(0, 8)}`,
      display_name: name,
      country: extraData?.country || 'United States',
      favorite_team: extraData?.favorite_team || 'None',
      favorite_club: extraData?.favorite_club || 'None',
      language: extraData?.language || 'en',
      role: extraData?.role || (firebaseUser.email?.toLowerCase().includes('volunteer') ? 'Volunteer' : 
                               firebaseUser.email?.toLowerCase().includes('security') ? 'Security' : 
                               firebaseUser.email?.toLowerCase().includes('medical') ? 'Medical' : 
                               firebaseUser.email?.toLowerCase().includes('operations') ? 'Operations' : 'Fan'),
    }

    const res = await fetch(`${BACKEND_URL}/api/v1/auth/sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    })

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}))
      throw new Error(errData.detail || 'Failed to sync user profile with database')
    }

    const dbUser = await res.json()
    
    // Map backend user model back to frontend UserProfile
    return {
      name: dbUser.display_name,
      email: dbUser.email,
      role: dbUser.role || 'Fan',
      avatarInitials: name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
      country: dbUser.country,
      favTeam: dbUser.favorite_team,
      favClub: dbUser.favorite_club,
      membership: dbUser.role === 'Fan' ? 'Standard' : 'Staff',
      language: dbUser.language,
    }
  }

  /**
   * Signs up a new user using Email & Password.
   */
  static async signUp(email: string, password: string, profileData: SyncProfileData): Promise<UserProfile> {
    // Validate username uniqueness on backend BEFORE creating Firebase account
    const checkUserRes = await fetch(`${BACKEND_URL}/api/v1/auth/check-username?username=${encodeURIComponent(profileData.username || '')}`)
    if (!checkUserRes.ok) {
      const errData = await checkUserRes.json().catch(() => ({}))
      throw new Error(errData.detail || 'Username check failed')
    }

    const { available } = await checkUserRes.json()
    if (!available) {
      throw new Error('Username is already taken')
    }

    // Create account on Firebase
    const credential = await createUserWithEmailAndPassword(auth, email, password)
    
    // Send email verification
    await sendEmailVerification(credential.user)

    // Sync profile with PostgreSQL
    return this.syncUserProfile(credential.user, profileData)
  }

  /**
   * Signs in a user using Email & Password.
   */
  static async login(email: string, password: string): Promise<UserProfile> {
    const credential = await signInWithEmailAndPassword(auth, email, password)
    
    // Sync profile with PostgreSQL
    return this.syncUserProfile(credential.user)
  }

  /**
   * Signs in a user using Google OAuth popup.
   */
  static async loginWithGoogle(): Promise<UserProfile> {
    const credential = await signInWithPopup(auth, googleProvider)
    
    // Sync profile with PostgreSQL
    return this.syncUserProfile(credential.user)
  }

  /**
   * Triggers a password reset email from Firebase.
   */
  static async sendPasswordReset(email: string): Promise<void> {
    await sendPasswordResetEmail(auth, email)
  }

  /**
   * Signs the current user out.
   */
  static async logout(): Promise<void> {
    try {
      const user = auth.currentUser
      if (user) {
        const token = await user.getIdToken()
        await fetch(`${BACKEND_URL}/api/v1/auth/logout`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` }
        }).catch(() => {})
      }
    } catch (e) {
      // Ignore errors on logout
    }
    await signOut(auth)
  }
}
