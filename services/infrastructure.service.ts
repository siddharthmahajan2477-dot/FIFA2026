export class InfrastructureService {
  private static apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  static async getParkingZones() {
    try {
      const response = await fetch(`${this.apiUrl}/api/v1/infrastructure/parking-zones`, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error(`Parking fetch failed: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.warn('[InfrastructureService] Using fallback parking data:', error);
      return [
        { zone_id: "P-NORTH-1", name: "North Lot A (VIP & Media)", total_spots: 1200, occupied_spots: 940, ev_chargers_available: 34, fee_rate_usd: 40 },
        { zone_id: "P-SOUTH-2", name: "South Lot B (Public)", total_spots: 3500, occupied_spots: 2100, ev_chargers_available: 12, fee_rate_usd: 25 }
      ];
    }
  }

  static async getEnergyUsage() {
    try {
      const response = await fetch(`${this.apiUrl}/api/v1/infrastructure/energy-usage`, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error(`Energy fetch failed: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.warn('[InfrastructureService] Using fallback energy data:', error);
      return {
        current_load_mw: 14.2,
        grid_supply_mw: 9.5,
        solar_roof_generation_mw: 4.7,
        renewable_percentage: 33.1,
        carbon_offset_tons_today: 18.4
      };
    }
  }

  static async getWaterUsage() {
    try {
      const response = await fetch(`${this.apiUrl}/api/v1/infrastructure/water-usage`, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error(`Water fetch failed: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.warn('[InfrastructureService] Using fallback water telemetry:', error);
      return { daily_consumption_gallons: 45000, recycled_greywater_gallons: 18500, recycled_percentage: 41.1 };
    }
  }

  static async getSewageUsage() {
    try {
      const response = await fetch(`${this.apiUrl}/api/v1/infrastructure/sewage-usage`, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error(`Sewage fetch failed: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.warn('[InfrastructureService] Using fallback sewage telemetry:', error);
      return { capacity_percentage: 38.4, current_flow_rate_gpm: 420, peak_capacity_gpm: 1200 };
    }
  }
}
