'use client'

import React, { useState, useEffect } from 'react'
import { FoodService } from '../../services/food.service'
import { FoodItem } from '../../types/orders'
import { StatCard } from '@/components/StatCard'
import { Utensils, Clock, Star, AlertCircle } from 'lucide-react'

export default function FoodBeverage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'drinks' | 'snacks' | 'meals'>('all')
  const [menuItems, setMenuItems] = useState<FoodItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await FoodService.getMenu()
        setMenuItems(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  const filteredItems = menuItems.filter(
    (item) => selectedCategory === 'all' || item.category === selectedCategory
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
          <h1 className="text-3xl font-bold text-foreground">Food & Beverage</h1>
          <p className="mt-1 text-muted-foreground">Browse menus and order from stadium vendors</p>
        </div>

        {/* Menu Stats */}
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-bold text-foreground">Quick Stats</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard
              label="Average Wait Time"
              value="0 min"
              subtext="Current queue"
              icon={<Clock className="h-5 w-5" />}
            />
            <StatCard
              label="Customer Rating"
              value="--"
              subtext="Out of 5 stars"
              icon={<Star className="h-5 w-5" />}
            />
            <StatCard
              label="Popular Dish"
              value="None"
              subtext="Top seller"
              icon={<Utensils className="h-5 w-5" />}
            />
          </div>
        </section>

        {/* Menu Categories */}
        <div className="mb-6 flex gap-2 border-b border-border">
          {['all', 'drinks', 'snacks', 'meals'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category as any)}
              className={`px-4 py-2 font-semibold transition-all capitalize cursor-pointer ${
                selectedCategory === category
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <section className="mb-12">
          <h2 className="mb-4 text-lg font-bold text-foreground">Menu</h2>
          {filteredItems.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* Menu items rendered dynamically */}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border/40 bg-card/10 p-8 text-center text-xs text-muted-foreground flex flex-col items-center justify-center gap-2">
              <AlertCircle className="h-8 w-8 opacity-35" />
              <p className="font-bold">No menu items available</p>
              <p className="opacity-75">Waiting for stadium vendor synchronization</p>
            </div>
          )}
        </section>

        {/* Popular Items Section */}
        <section>
          <h2 className="mb-4 text-lg font-bold text-foreground">Popular Recommendations</h2>
          <div className="rounded-xl border border-dashed border-border/40 bg-card/10 p-8 text-center text-xs text-muted-foreground">
            No popular recommendations available at this time
          </div>
        </section>

        {/* Order Summary */}
        <section className="mt-12 rounded-lg border border-border bg-card p-6 text-card-foreground">
          <h2 className="mb-4 font-bold text-foreground">Your Order</h2>
          <div className="flex items-center justify-between rounded-lg bg-muted p-4 text-center">
            <span className="text-sm text-muted-foreground">Start ordering to see your items here</span>
            <button disabled className="rounded bg-neutral-900 px-4 py-2 text-xs font-semibold text-neutral-450 cursor-not-allowed opacity-50">
              View Cart
            </button>
          </div>
        </section>
      </div>
    </main>
  )
}
