'use client'

import React, { useState, useEffect } from 'react'
import { SettingsPanel, SettingOption } from '@/components/infrastructure/SettingsPanel'

const appearanceSettings: SettingOption[] = [
  { id: 'theme', label: 'Theme', type: 'select', value: 'light', options: [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'auto', label: 'Auto' },
  ]},
  { id: 'animations', label: 'Animations', description: 'Enable transition animations', type: 'toggle', value: true },
  { id: 'reduced-motion', label: 'Reduced Motion', description: 'Minimize animations for accessibility', type: 'toggle', value: false },
]

const notificationSettings: SettingOption[] = [
  { id: 'email-alerts', label: 'Email Alerts', description: 'Receive alerts via email', type: 'toggle', value: true },
  { id: 'in-app-notifications', label: 'In-App Notifications', description: 'Browser notifications', type: 'toggle', value: true },
  { id: 'sms-critical', label: 'SMS for Critical Events', description: 'Get SMS on critical incidents', type: 'toggle', value: false },
  { id: 'notification-freq', label: 'Notification Frequency', type: 'select', value: 'immediate', options: [
    { value: 'immediate', label: 'Immediate' },
    { value: 'hourly', label: 'Hourly Digest' },
    { value: 'daily', label: 'Daily Summary' },
  ]},
]

const securitySettings: SettingOption[] = [
  { id: '2fa', label: 'Two-Factor Authentication', description: 'Add extra security layer', type: 'toggle', value: true },
  { id: 'session-timeout', label: 'Session Timeout', type: 'select', value: '30', options: [
    { value: '15', label: '15 minutes' },
    { value: '30', label: '30 minutes' },
    { value: '60', label: '1 hour' },
    { value: '0', label: 'Never timeout' },
  ]},
  { id: 'ip-lock', label: 'IP Whitelist', description: 'Restrict login to specific IPs', type: 'toggle', value: false },
]

const systemSettings: SettingOption[] = [
  { id: 'timezone', label: 'Timezone', type: 'select', value: 'UTC', options: [
    { value: 'UTC', label: 'UTC' },
    { value: 'EST', label: 'Eastern' },
    { value: 'CST', label: 'Central' },
    { value: 'PST', label: 'Pacific' },
  ]},
  { id: 'language', label: 'Language', type: 'select', value: 'en', options: [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
  ]},
  { id: 'date-format', label: 'Date Format', type: 'select', value: 'MM/DD/YYYY', options: [
    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
  ]},
]

export default function SettingsPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-background py-8 animate-pulse">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="h-32 bg-card/50 rounded-xl" />
          <div className="h-64 bg-card/50 rounded-xl" />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground">System Settings</h1>
          <p className="mt-2 text-lg text-muted-foreground">Configure application preferences and behavior</p>
        </div>

        {/* Settings Panels */}
        <div className="space-y-6">
          <SettingsPanel title="Appearance" settings={appearanceSettings} />
          <SettingsPanel title="Notifications" settings={notificationSettings} />
          <SettingsPanel title="Security" settings={securitySettings} />
          <SettingsPanel title="System" settings={systemSettings} />
        </div>
      </div>
    </main>
  )
}
