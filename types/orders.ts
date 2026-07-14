export interface FoodItem {
  id: string | number
  name: string
  price: number
  category: 'food' | 'beverage' | 'snack'
  available: boolean
  rating?: number
}

export interface FoodOrder {
  id: string | number
  items: string
  total: number
  status: 'pending' | 'preparing' | 'ready' | 'completed'
  timestamp: string
}

export interface MerchandiseItem {
  id: string | number
  name: string
  price: number
  category: 'clothing' | 'accessory' | 'souvenir'
  available: boolean
  rating?: number
}
