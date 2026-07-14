import { UserProfile, UserPreferences } from '../types/user'
import { auth } from '@/lib/firebase'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'

export class UserService {
  static async getProfile(): Promise<UserProfile> {
    const user = auth.currentUser
    if (!user) throw new Error('Not authenticated')
    
    const token = await user.getIdToken()
    
    const res = await fetch(`${BACKEND_URL}/api/v1/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    
    if (!res.ok) {
      throw new Error('Failed to fetch profile')
    }
    
    const data = await res.json()
    const name = data.profile.display_name || data.username || user.email?.split('@')[0] || 'Fan'
    
    return {
      name: name,
      email: data.email,
      role: data.role,
      avatarInitials: name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase(),
      country: data.profile.country,
      favTeam: data.favorite_team || 'None',
      favClub: data.favorite_club || 'None',
      membership: data.role === 'Fan' ? 'Standard' : 'Staff',
      language: data.profile.language,
    }
  }

  static async updatePreferences(preferences: Partial<UserPreferences>): Promise<boolean> {
    const user = auth.currentUser
    if (!user) throw new Error('Not authenticated')
    
    const token = await user.getIdToken()
    
    // Map UserPreferences to backend payload
    const payload = {
      email_updates: preferences.emailNotifications,
      push_notifications: preferences.pushNotifications,
      sms_alerts: preferences.smsAlerts
    }
    
    const res = await fetch(`${BACKEND_URL}/api/v1/users/me/preferences`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    })
    
    return res.ok
  }
}
