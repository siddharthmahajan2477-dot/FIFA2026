import { MerchandiseItem } from '../types/orders'

export class MerchandiseService {
  static async getCatalog(): Promise<MerchandiseItem[]> {
        try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/catalog`, {
        headers: { 'Authorization': `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('token') : ''}` }
      });
      if (!response.ok) throw new Error('Fetch failed');
      return await response.json();
    } catch (error) {
      console.error('getCatalog Error:', error);
      return [] as any;
    }
  }

  static async purchaseItems(items: any[]): Promise<boolean> {
        try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/purchaseitems`, {
        headers: { 'Authorization': `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('token') : ''}` }
      });
      if (!response.ok) throw new Error('Fetch failed');
      return await response.json();
    } catch (error) {
      console.error('purchaseItems Error:', error);
      return null as any;
    }
  }
}
