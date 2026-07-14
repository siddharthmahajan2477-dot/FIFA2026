import { AnalyticsDataPoint, AIInsight } from '../types/analytics'

export class AnalyticsService {
  static async getUsageHistory(): Promise<AnalyticsDataPoint[]> {
        try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/usagehistory`, {
        headers: { 'Authorization': `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('token') : ''}` }
      });
      if (!response.ok) throw new Error('Fetch failed');
      return await response.json();
    } catch (error) {
      console.error('getUsageHistory Error:', error);
      return [] as any;
    }
  }

  static async getInsights(): Promise<AIInsight[]> {
        try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/insights`, {
        headers: { 'Authorization': `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('token') : ''}` }
      });
      if (!response.ok) throw new Error('Fetch failed');
      return await response.json();
    } catch (error) {
      console.error('getInsights Error:', error);
      return [] as any;
    }
  }
}
