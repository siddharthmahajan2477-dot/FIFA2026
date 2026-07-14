export interface UserProfile {
  name: string
  email: string
  role: string
  avatarInitials: string
  country: string
  favTeam: string
  favClub: string
  membership: string
  language: string
}

export interface UserPreferences {
  pushNotifications: boolean
  emailNewsletter: boolean
  darkMode: boolean
  language: string
}
