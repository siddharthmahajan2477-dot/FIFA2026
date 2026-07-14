import { Team } from '../types/team'

export class TeamService {
  static async getTeams(): Promise<Team[]> {
        try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/teams`, {
        headers: { 'Authorization': `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('token') : ''}` }
      });
      if (!response.ok) throw new Error('Fetch failed');
      return await response.json();
    } catch (error) {
      console.error('getTeams Error:', error);
      return [] as any;
    }
  }

  static async getStandings(): Promise<Team[]> {
        try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/standings`, {
        headers: { 'Authorization': `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('token') : ''}` }
      });
      if (!response.ok) throw new Error('Fetch failed');
      return await response.json();
    } catch (error) {
      console.error('getStandings Error:', error);
      return [] as any;
    }
  }
}
