import React from 'react'

interface SkeletonLoaderProps {
  count?: number
  variant?: 'card' | 'line' | 'circle'
}

export function SkeletonLoader({ count = 1, variant = 'card' }: SkeletonLoaderProps) {
  const baseClass = 'animate-pulse bg-muted'

  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>
          {variant === 'card' && (
            <div className={`${baseClass} h-20 rounded-lg`} />
          )}
          {variant === 'line' && (
            <div className={`${baseClass} h-4 rounded`} />
          )}
          {variant === 'circle' && (
            <div className={`${baseClass} h-10 w-10 rounded-full`} />
          )}
        </div>
      ))}
    </div>
  )
}
