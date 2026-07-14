export interface WeatherStats {
  temp: number
  condition: string
  humidity: number
  wind: string
}

export class WeatherService {
  static async getCurrentWeather(): Promise<WeatherStats> {
        try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/currentweather`, {
        headers: { 'Authorization': `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('token') : ''}` }
      });
      if (!response.ok) throw new Error('Fetch failed');
      return await response.json();
    } catch (error) {
      console.error('getCurrentWeather Error:', error);
      return null as any;
    }
  }
}
