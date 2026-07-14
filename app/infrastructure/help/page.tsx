'use client'

import React, { useState, useEffect } from 'react'
import { AlertCircle } from 'lucide-react'

export default function HelpPage() {
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
          <div className="h-40 bg-card/50 rounded-xl" />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground">Help Center</h1>
          <p className="mt-2 text-lg text-muted-foreground">Documentation, FAQs, and support resources</p>
        </div>

        {/* Resources list empty state */}
        <div className="rounded-xl border border-dashed border-border/40 bg-card/10 p-8 text-center text-xs text-muted-foreground flex flex-col items-center justify-center gap-2 mb-8">
          <AlertCircle className="h-8 w-8 opacity-35" />
          <p className="font-bold">No documentation or FAQs found</p>
        </div>
      </div>
    </main>
  )
}
