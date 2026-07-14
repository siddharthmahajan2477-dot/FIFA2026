'use client'

import React, { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { StatCard } from '@/components/StatCard'
import { User, Mail, Globe, Bell, Moon, LogOut, Settings, Trophy, Award } from 'lucide-react'

export default function FanProfile() {
  const [selectedTab, setSelectedTab] = useState<'profile' | 'preferences' | 'badges' | 'settings'>('profile')
  const { user, loading, logout } = useAuth()

  const handleSignOut = () => {
    logout()
    window.location.href = '/auth'
  }

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'preferences', label: 'Preferences' },
    { id: 'badges', label: 'Badges & Achievements' },
    { id: 'settings', label: 'Settings' },
  ]

  if (loading) {
    return (
      <main className="min-h-screen bg-background py-6 sm:py-8 lg:py-10 animate-pulse">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="h-32 bg-card/50 rounded-xl" />
          <div className="grid gap-4 sm:grid-cols-4">
            <div className="h-24 bg-card/50 rounded-xl" />
            <div className="h-24 bg-card/50 rounded-xl" />
            <div className="h-24 bg-card/50 rounded-xl" />
            <div className="h-24 bg-card/50 rounded-xl" />
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background py-6 sm:py-8 lg:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header - Profile Overview */}
        <div className="mb-8 rounded-lg border border-border bg-card p-6 text-card-foreground">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-2xl font-bold text-white">
                {user ? user.avatarInitials : '👤'}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{user ? user.name : 'Guest User'}</h1>
                <p className="text-sm text-muted-foreground">{user ? `${user.role} (${user.membership})` : 'Guest Session'}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="rounded bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">Member Since 2026</span>
                  <span className="rounded bg-green-100 px-2 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    Active
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="rounded border border-border px-4 py-2 text-sm font-semibold text-foreground transition-all hover:bg-muted cursor-pointer">
                <Settings className="mr-2 inline h-4 w-4" />
                Edit Profile
              </button>
              <button onClick={handleSignOut} className="rounded border border-destructive px-4 py-2 text-sm font-semibold text-destructive transition-all hover:bg-destructive/10 cursor-pointer">
                <LogOut className="mr-2 inline h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <section className="mb-8">
          <div className="grid gap-4 sm:grid-cols-4">
            <StatCard
              label="Fan Points"
              value="0"
              subtext="Earn rewards"
              icon={<Trophy className="h-5 w-5" />}
            />
            <StatCard
              label="Matches Attended"
              value="0"
              subtext="This tournament"
            />
            <StatCard
              label="Favorite Team"
              value={user ? user.favTeam : 'None'}
              subtext="⚽"
            />
            <StatCard
              label="Account Level"
              value={user ? user.membership : 'Standard'}
              subtext="Membership tier"
              icon={<Award className="h-5 w-5" />}
            />
          </div>
        </section>

        {/* Tabs */}
        <div className="mb-8 flex gap-2 border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as any)}
              className={`px-4 py-2 font-semibold transition-all cursor-pointer ${
                selectedTab === tab.id
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {selectedTab === 'profile' && (
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-6 text-card-foreground">
              <h2 className="mb-4 font-bold text-foreground flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground">Full Name</p>
                  <p className="mt-1 text-sm font-semibold text-foreground">{user ? user.name : 'Guest User'}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground">Email</p>
                  <div className="mt-1 flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm font-semibold text-foreground">{user ? user.email : 'guest@example.com'}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground">Phone</p>
                  <p className="mt-1 text-sm font-semibold text-foreground">Not provided</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground">Country</p>
                  <p className="mt-1 text-sm font-semibold text-foreground">{user ? user.country : 'Not configured'}</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-6 text-card-foreground">
              <h2 className="mb-4 font-bold text-foreground">Fan Profile</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground">Favorite Team</p>
                  <p className="mt-1 text-lg font-bold text-primary">{user ? user.favTeam : 'None'}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground">Favorite Players</p>
                  <p className="mt-1 text-sm font-semibold text-foreground">No favorite players configured</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground">Membership Tier</p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="rounded bg-yellow-100 px-3 py-1 text-sm font-bold text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                      {user ? user.membership : 'Guest'}
                    </span>
                    <span className="text-xs text-muted-foreground">Preferences synced</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground">Join Date</p>
                  <p className="mt-1 text-sm font-semibold text-foreground">July 2026</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Preferences Tab */}
        {selectedTab === 'preferences' && (
          <div className="max-w-2xl rounded-lg border border-border bg-card p-6 text-card-foreground">
            <h2 className="mb-6 font-bold text-foreground">Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-semibold text-foreground">Push Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive match alerts and updates</p>
                  </div>
                </div>
                <input type="checkbox" className="h-5 w-5" />
              </div>
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-semibold text-foreground">Email Newsletter</p>
                    <p className="text-sm text-muted-foreground">Weekly summary of matches and news</p>
                  </div>
                </div>
                <input type="checkbox" className="h-5 w-5" />
              </div>
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-3">
                  <Moon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-semibold text-foreground">Dark Mode</p>
                    <p className="text-sm text-muted-foreground">System default theme preference</p>
                  </div>
                </div>
                <input type="checkbox" defaultChecked className="h-5 w-5" />
              </div>
              <div className="flex items-center justify-between pb-4">
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-semibold text-foreground">Language</p>
                    <p className="text-sm text-muted-foreground">{user ? user.language : 'English'}</p>
                  </div>
                </div>
                <select className="rounded border border-border bg-muted px-3 py-1 text-sm font-semibold text-foreground">
                  <option>English</option>
                  <option>Español</option>
                  <option>Português</option>
                  <option>Français</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Badges Tab */}
        {selectedTab === 'badges' && (
          <div>
            <h2 className="mb-4 text-lg font-bold text-foreground">Badges & Achievements</h2>
            <div className="rounded-xl border border-dashed border-border/45 bg-card/10 p-8 text-center text-xs text-muted-foreground">
              No achievements unlocked yet
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {selectedTab === 'settings' && (
          <div className="max-w-2xl rounded-lg border border-border bg-card p-6 text-card-foreground">
            <h2 className="mb-6 font-bold text-foreground">Account Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <p className="font-semibold text-foreground">Change Password</p>
                  <p className="text-sm text-muted-foreground">Update your account password</p>
                </div>
                <button className="rounded border border-border px-4 py-2 text-sm font-semibold text-foreground transition-all hover:bg-muted cursor-pointer">
                  Change
                </button>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <p className="font-semibold text-foreground">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">Add extra security to your account</p>
                </div>
                <button className="rounded border border-border px-4 py-2 text-sm font-semibold text-foreground transition-all hover:bg-muted cursor-pointer">
                  Enable
                </button>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <p className="font-semibold text-foreground">Privacy Settings</p>
                  <p className="text-sm text-muted-foreground">Control who can see your profile</p>
                </div>
                <button className="rounded border border-border px-4 py-2 text-sm font-semibold text-foreground transition-all hover:bg-muted cursor-pointer">
                  Manage
                </button>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <p className="font-semibold text-foreground">Connected Devices</p>
                  <p className="text-sm text-muted-foreground">Manage your active sessions</p>
                </div>
                <button className="rounded border border-border px-4 py-2 text-sm font-semibold text-foreground transition-all hover:bg-muted cursor-pointer">
                  View
                </button>
              </div>
              <div className="flex items-center justify-between pb-4">
                <div>
                  <p className="font-semibold text-foreground">Delete Account</p>
                  <p className="text-sm text-muted-foreground">Permanently delete your account</p>
                </div>
                <button className="rounded border border-destructive px-4 py-2 text-sm font-semibold text-destructive transition-all hover:bg-destructive/10 cursor-pointer">
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
