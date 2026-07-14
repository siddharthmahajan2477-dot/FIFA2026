'use client'

import React, { useState, useEffect } from 'react'
import { Search as SearchIcon, AlertCircle } from 'lucide-react'
import { AIService } from '../../../services/ai.service'

export default function SearchReporting() {
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [results, setResults] = useState<any[]>([])

  useEffect(() => {
    const load = async () => {
      try {
        const data = await AIService.getSearchReports(searchQuery)
        setResults(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [searchQuery])

  if (loading) {
    return (
      <main className="min-h-screen bg-background py-8 animate-pulse">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="h-32 bg-card/50 rounded-xl" />
          <div className="h-48 bg-card/50 rounded-xl" />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground">Smart Search & Reporting</h1>
          <p className="mt-2 text-lg text-muted-foreground">AI-powered search and automated report generation</p>
        </div>

        {/* Search Input */}
        <div className="flex gap-2 mb-8">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across reports, incidents, profiles..."
              className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Empty State */}
        <div className="rounded-xl border border-dashed border-border/40 bg-card/10 p-8 text-center text-xs text-muted-foreground flex flex-col items-center justify-center gap-2">
          <AlertCircle className="h-8 w-8 opacity-35" />
          <p className="font-bold">No reports or search outcomes found</p>
          <p className="opacity-75">Connect database indexes to query system catalogs</p>
        </div>

      </div>
    </main>
  )
}
