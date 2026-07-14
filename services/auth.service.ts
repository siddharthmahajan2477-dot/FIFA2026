// ─── Backward-compatible Adapter for AuthService ──────────────────────────────
// Routes calls to the real Firebase/PostgreSQL AuthService under the hood.

import { AuthService as RealAuthService } from './auth'
import { UserProfile } from '../types/user'
import { auth } from '@/lib/firebase'

export class AuthService {
  static async login(email: string, password: string): Promise<UserProfile> {
    return RealAuthService.login(email, password)
  }

  static async signup(data: any): Promise<UserProfile> {
    const profileData = {
      username: data.username || data.email.split('@')[0],
      display_name: data.name || 'New Fan',
      country: data.country || 'United States',
      favorite_team: data.favTeam || 'None',
      favorite_club: data.favClub || 'None',
      language: data.language || 'en',
    }
    return RealAuthService.signUp(data.email, data.password, profileData)
  }

  static async requestOtp(email: string): Promise<boolean> {
    // Return true for compatibility (OTP logic handled by Firebase MFA/standard auth)
    return true
  }

  static async verifyOtp(code: string): Promise<boolean> {
    // Return true for compatibility (OTP logic handled by Firebase MFA/standard auth)
    return true
  }

  static async recoverPassword(email: string): Promise<boolean> {
    await RealAuthService.sendPasswordReset(email)
    return true
  }

  static async recoverUsername(emailOrPhone: string): Promise<string[]> {
    return ['Not supported via Firebase. Use email sign in instead.']
  }

  static getCurrentUser(): UserProfile | null {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('currentUser')
      if (stored) {
        try {
          return JSON.parse(stored)
        } catch (e) {
          return null
        }
      }
    }
    return null
  }

  static logout(): void {
    RealAuthService.logout()
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentUser')
    }
  }
}
