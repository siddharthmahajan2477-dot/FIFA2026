export class WeatherService {
  private static apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://fifa-smart-stadium-backend.onrender.com';

  static async getCurrentWeather(lat = 40.8135, lon = -74.0743) {
    try {
      const response = await fetch(`${this.apiUrl}/api/v1/operations/weather?lat=${lat}&lon=${lon}`, {
        headers: { 'Content-Type': 'application/json' },
        next: { revalidate: 300 }
      });
      if (!response.ok) throw new Error(`Weather fetch failed: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.warn('[WeatherService] Using fallback weather telemetry:', error);
      return {
        temperature: 24.5,
        humidity: 48,
        wind_speed: 12.4,
        description: 'Clear skies, optimal match weather',
        crowd_comfort_index: 'Optimal',
        heat_alert: false,
        storm_alert: false
      };
    }
  }
}
