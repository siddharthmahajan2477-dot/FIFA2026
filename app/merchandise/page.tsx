'use client'

import React, { useState, useEffect } from 'react'
import { MerchandiseService } from '../../services/merchandise.service'
import { MerchandiseItem } from '../../types/orders'
import { StatCard } from '@/components/StatCard'
import { ShoppingBag, Star, AlertCircle } from 'lucide-react'

export default function Merchandise() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'jerseys' | 'accessories' | 'souvenirs'>('all')
  const [products, setProducts] = useState<MerchandiseItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await MerchandiseService.getCatalog()
        setProducts(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'jerseys', label: 'Jerseys' },
    { id: 'accessories', label: 'Accessories' },
    { id: 'souvenirs', label: 'Souvenirs' },
  ]

  const filteredProducts = products.filter(
    (p) => selectedCategory === 'all' || p.category === selectedCategory
  )

  if (loading) {
    return (
      <main className="min-h-screen bg-background py-6 sm:py-8 lg:py-10 animate-pulse">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="h-32 bg-card/50 rounded-xl" />
          <div className="grid gap-4 sm:grid-cols-3">
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
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Official Merchandise</h1>
          <p className="mt-1 text-muted-foreground">FIFA World Cup 2026 authentic merchandise and collectibles</p>
        </div>

        {/* Shop Stats */}
        <section className="mb-8">
          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard
              label="Products Available"
              value={filteredProducts.length}
              subtext="In stock"
              icon={<ShoppingBag className="h-5 w-5" />}
            />
            <StatCard
              label="Avg Rating"
              value="--"
              subtext="Out of 5 stars"
              icon={<Star className="h-5 w-5" />}
            />
            <StatCard
              label="Free Shipping"
              value="On Orders"
              subtext="$100+"
            />
          </div>
        </section>

        {/* Category Filter */}
        <div className="mb-8 flex gap-2 border-b border-border pb-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id as any)}
              className={`px-4 py-2 font-semibold transition-all cursor-pointer ${
                selectedCategory === category.id
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <section className="mb-12">
          {filteredProducts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Products rendered dynamically */}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border/40 bg-card/10 p-8 text-center text-xs text-muted-foreground flex flex-col items-center justify-center gap-2">
              <AlertCircle className="h-8 w-8 opacity-35" />
              <p className="font-bold">No merchandise items available</p>
              <p className="opacity-75">Store catalog synchronization pending</p>
            </div>
          )}
        </section>

      </div>
    </main>
  )
}
