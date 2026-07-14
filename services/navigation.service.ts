export class NavigationService {
  private static apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  static async getIndoorRoutes(origin = "Gate A", destination = "Section 104", accessibleOnly = false) {
    try {
      const response = await fetch(`${this.apiUrl}/api/v1/navigation/indoor-routes?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&accessible_only=${accessibleOnly}`, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error(`Navigation fetch failed: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.warn('[NavigationService] Using fallback routing payload:', error);
      return {
        origin,
        destination,
        distance_meters: 240,
        estimated_time_minutes: 3.5,
        accessible_route: accessibleOnly,
        steps: [
          { step: 1, instruction: `Head North from ${origin} past Security Gate A`, distance: "50m" },
          { step: 2, instruction: "Turn Right at Concourse Level 1 Main Corridor", distance: "120m" },
          { step: 3, instruction: "Proceed past Concessions Stand 12 to Ramp B", distance: "50m" },
          { step: 4, instruction: `Arrive at ${destination} Entrance on Left`, distance: "20m" }
        ],
        poi_passed: ["Restrooms Level 1", "First Aid Station A", "Food Court 2"]
      };
    }
  }
}
