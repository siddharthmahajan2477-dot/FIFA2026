'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AlertCircle } from 'lucide-react'

export default function AuditPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-background py-8 animate-pulse">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="h-32 bg-card/50 rounded-xl" />
          <div className="h-40 bg-card/50 rounded-xl" />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground">Audit Logs</h1>
          <p className="mt-2 text-lg text-muted-foreground">Complete activity and security event tracking</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Input placeholder="Search by user or resource..." className="flex-1" />
          <Select disabled>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by action" />
            </SelectTrigger>
          </Select>
          <Select disabled>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by date" />
            </SelectTrigger>
          </Select>
        </div>

        {/* Logs */}
        <Card>
          <CardContent className="p-8">
            <div className="rounded-xl border border-dashed border-border/40 bg-card/10 p-8 text-center text-xs text-muted-foreground flex flex-col items-center justify-center gap-2">
              <AlertCircle className="h-8 w-8 opacity-35" />
              <p className="font-bold">No audit events logged</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
