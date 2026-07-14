import { FoodItem, FoodOrder } from '../types/orders'

export class FoodService {
  static async getMenu(): Promise<FoodItem[]> {
        try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/menu`, {
        headers: { 'Authorization': `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('token') : ''}` }
      });
      if (!response.ok) throw new Error('Fetch failed');
      return await response.json();
    } catch (error) {
      console.error('getMenu Error:', error);
      return [] as any;
    }
  }

  static async placeOrder(items: any[]): Promise<FoodOrder> {
        try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/placeorder`, {
        headers: { 'Authorization': `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('token') : ''}` }
      });
      if (!response.ok) throw new Error('Fetch failed');
      return await response.json();
    } catch (error) {
      console.error('placeOrder Error:', error);
      return null as any;
    }
  }

  static async getOrders(): Promise<FoodOrder[]> {
        try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/orders`, {
        headers: { 'Authorization': `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('token') : ''}` }
      });
      if (!response.ok) throw new Error('Fetch failed');
      return await response.json();
    } catch (error) {
      console.error('getOrders Error:', error);
      return [] as any;
    }
  }
}
