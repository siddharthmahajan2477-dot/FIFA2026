import { Player } from '../types/player'

export class PlayerService {
  static async getPlayers(): Promise<Player[]> {
        try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/players`, {
        headers: { 'Authorization': `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('token') : ''}` }
      });
      if (!response.ok) throw new Error('Fetch failed');
      return await response.json();
    } catch (error) {
      console.error('getPlayers Error:', error);
      return [] as any;
    }
  }

  static async getTopScorers(): Promise<Player[]> {
        try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/topscorers`, {
        headers: { 'Authorization': `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('token') : ''}` }
      });
      if (!response.ok) throw new Error('Fetch failed');
      return await response.json();
    } catch (error) {
      console.error('getTopScorers Error:', error);
      return [] as any;
    }
  }
}
