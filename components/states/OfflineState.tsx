'use client'

import { WifiOff } from 'lucide-react'

export function OfflineBanner() {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm">
      <WifiOff className="h-4 w-4 text-yellow-600" />
      <div className="flex-1">
        <p className="font-medium text-yellow-900">You are currently offline</p>
        <p className="text-xs text-yellow-700">Showing cached data. Changes will sync when you reconnect.</p>
      </div>
    </div>
  )
}
