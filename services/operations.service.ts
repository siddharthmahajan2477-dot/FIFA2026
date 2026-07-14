export class OperationsService {
  private static apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  static async getVolunteers() {
    try {
      const response = await fetch(`${this.apiUrl}/api/v1/operations/volunteers`, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error(`Volunteers fetch failed: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.warn('[OperationsService] Using fallback volunteers telemetry:', error);
      return [
        { id: "v1", name: "Elena Rostova", role: "Fan Concierge", zone: "Gate A Plaza", status: "Active", shift: "14:00 - 22:00", tasks_completed: 8 },
        { id: "v2", name: "Marcus Vance", role: "Medical Assistant", zone: "Section 112", status: "On Break", shift: "16:00 - 00:00", tasks_completed: 4 }
      ];
    }
  }

  static async getMedicalIncidents() {
    try {
      const response = await fetch(`${this.apiUrl}/api/v1/operations/medical-incidents`, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error(`Medical incidents fetch failed: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.warn('[OperationsService] Using fallback medical incidents:', error);
      return [
        { id: "med-101", location: "Concourse Level 2 - Gate C", type: "Heat Exhaustion", severity: "Medium", status: "Dispatched", responder: "Medic Unit 4", time_reported: "10 mins ago" }
      ];
    }
  }

  static async getSecurityIncidents() {
    try {
      const response = await fetch(`${this.apiUrl}/api/v1/operations/security-incidents`, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error(`Security incidents fetch failed: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.warn('[OperationsService] Using fallback security incidents:', error);
      return [
        { id: "sec-401", location: "Gate D Turnstiles", type: "Unauthorized Entry Attempt", threat_level: "Code Yellow", status: "Investigating", units_assigned: 3 }
      ];
    }
  }

  static async getSanitationStats() {
    try {
      const response = await fetch(`${this.apiUrl}/api/v1/operations/sanitation-stats`, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error(`Sanitation stats fetch failed: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.warn('[OperationsService] Using fallback sanitation stats:', error);
      return { restroom_cleanliness_rating: 98.4, waste_bin_fill_level_avg: 42.1, active_cleaners: 145, supplies_stock_percent: 91.0 };
    }
  }

  static async getSanitationAlerts() {
    try {
      const response = await fetch(`${this.apiUrl}/api/v1/operations/sanitation-alerts`, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error(`Sanitation alerts fetch failed: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.warn('[OperationsService] Using fallback sanitation alerts:', error);
      return [{ id: "san-alt-1", zone: "Restroom 104B", issue: "High Bin Occupancy (85%)", priority: "High", timestamp: "5 mins ago" }];
    }
  }

  static async getCleaningTeams() {
    try {
      const response = await fetch(`${this.apiUrl}/api/v1/operations/cleaning-teams`, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error(`Cleaning teams fetch failed: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.warn('[OperationsService] Using fallback cleaning teams:', error);
      return [{ team: "Crew Alpha", leader: "John Miller", assigned_zone: "Level 1 North Concourse", status: "Cleaning", completion_rate: 88 }];
    }
  }

  static async getHygieneSupplies() {
    try {
      const response = await fetch(`${this.apiUrl}/api/v1/operations/hygiene-supplies`, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error(`Hygiene supplies fetch failed: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.warn('[OperationsService] Using fallback hygiene supplies:', error);
      return [{ item: "Sanitizer Refills", stock_level: 850, status: "Optimal", reorder_point: 200 }];
    }
  }

  static async getSewageSensors() {
    try {
      const response = await fetch(`${this.apiUrl}/api/v1/operations/sewage-sensors`, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error(`Sewage sensors fetch failed: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.warn('[OperationsService] Using fallback sewage sensors:', error);
      return [{ sensor_id: "SEW-01", location: "Main Stadium Outlet", flow_rate_lps: 42.5, status: "Normal", ph_level: 7.2 }];
    }
  }

  static async getWaterZones() {
    try {
      const response = await fetch(`${this.apiUrl}/api/v1/operations/water-zones`, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error(`Water zones fetch failed: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.warn('[OperationsService] Using fallback water zones:', error);
      return [{ zone: "Zone A (Plaza)", pressure_psi: 65, flow_gpm: 320, quality: "Pristine", leak_detected: false }];
    }
  }

  static async getAiPredictions() {
    try {
      const response = await fetch(`${this.apiUrl}/api/v1/operations/ai-predictions`, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error(`AI predictions fetch failed: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.warn('[OperationsService] Using fallback AI predictions:', error);
      return { predicted_peak_crowd_time: "19:45 EST", predicted_concession_queue_time: "4.2 mins avg", predicted_exit_egress_duration: "18 mins total" };
    }
  }

  static async getSanitationRoles() {
    try {
      const response = await fetch(`${this.apiUrl}/api/v1/operations/sanitation-roles`, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error(`Sanitation roles fetch failed: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.warn('[OperationsService] Using fallback sanitation roles:', error);
      return [{ role: "Team Lead", count: 12, description: "Supervises zone cleanliness and automated alerts" }];
    }
  }

  static async getSanitationMapZones() {
    try {
      const response = await fetch(`${this.apiUrl}/api/v1/operations/sanitation-map-zones`, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error(`Sanitation map zones fetch failed: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.warn('[OperationsService] Using fallback sanitation map zones:', error);
      return [{ id: "zone-1", name: "North Concourse", color: "#10B981", cleanliness_score: 98 }];
    }
  }
}
