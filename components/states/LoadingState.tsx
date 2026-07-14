'use client'

export function LoadingState({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-border bg-card p-8">
      <div className="text-center">
        <div className="mb-4 flex justify-center">
          <div className="relative h-8 w-8">
            <div className="absolute inset-0 animate-spin rounded-full border-2 border-border border-t-primary" />
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  )
}

export function SkeletonCard() {
  return (
    <div className="space-y-3 rounded-lg border border-border bg-card p-6">
      <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
      <div className="space-y-2">
        <div className="h-3 animate-pulse rounded bg-muted" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-muted" />
      </div>
    </div>
  )
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}
