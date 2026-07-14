import React from 'react'

export function LiveIndicator() {
  return (
    <div className="flex items-center gap-1.5">
      <div className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
      <span className="text-xs font-semibold text-red-600 dark:text-red-400">LIVE</span>
    </div>
  )
}
