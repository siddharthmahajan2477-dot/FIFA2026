export class PlayerService {
  private static apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  static async getPlayers() {
    try {
      const response = await fetch(`${this.apiUrl}/api/v1/matches/players`, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error(`Players fetch failed: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.warn('[PlayerService] Using fallback players data:', error);
      return [
        { id: "p1", name: "Christian Pulisic", team: "USA", position: "Forward", goals: 3, assists: 2, rating: 8.7 },
        { id: "p2", name: "Kylian Mbappé", team: "France", position: "Forward", goals: 4, assists: 1, rating: 9.1 },
        { id: "p3", name: "Lionel Messi", team: "Argentina", position: "Forward", goals: 2, assists: 4, rating: 8.9 }
      ];
    }
  }

  static async getTopScorers() {
    try {
      const response = await fetch(`${this.apiUrl}/api/v1/matches/topscorers`, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error(`Top Scorers fetch failed: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.warn('[PlayerService] Using fallback top scorers data:', error);
      return [
        { rank: 1, player: "Kylian Mbappé", team: "France", goals: 4, minutes_played: 270 },
        { rank: 2, player: "Christian Pulisic", team: "USA", goals: 3, minutes_played: 260 },
        { rank: 3, player: "Lionel Messi", team: "Argentina", goals: 2, minutes_played: 270 }
      ];
    }
  }
}
