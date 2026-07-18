export class AnalyticsService {
  private static apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://fifa-smart-stadium-backend.onrender.com';

  static async getUsageHistory() {
    try {
      const response = await fetch(`${this.apiUrl}/api/v1/analytics/usage-history`, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error(`Usage history fetch failed: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.warn('[AnalyticsService] Using fallback usage history:', error);
      return [
        { timestamp: "2026-06-08", attendance: 78200, energy_mw: 14.5, concession_sales_usd: 420000 },
        { timestamp: "2026-06-09", attendance: 81400, energy_mw: 15.1, concession_sales_usd: 485000 },
        { timestamp: "2026-06-10", attendance: 82500, energy_mw: 15.8, concession_sales_usd: 510000 },
        { timestamp: "2026-06-11", attendance: 82500, energy_mw: 16.2, concession_sales_usd: 540000 }
      ];
    }
  }

  static async getInsights() {
    try {
      const response = await fetch(`${this.apiUrl}/api/v1/analytics/insights`, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error(`Insights fetch failed: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.warn('[AnalyticsService] Using fallback insights:', error);
      return [
        { category: "Crowd Flow", insight: "North Gate A experienced 14% faster egress due to dynamic signage routing.", impact: "High" },
        { category: "Energy Optimization", insight: "Solar roof battery discharge reduced peak grid reliance by 33% during halftime.", impact: "High" },
        { category: "Commercial Sales", insight: "Mobile app express food pickup increased per-fan spend by $6.80.", impact: "Medium" }
      ];
    }
  }
}
