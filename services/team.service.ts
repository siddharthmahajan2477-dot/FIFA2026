export class TeamService {
  private static apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://fifa-smart-stadium-backend.onrender.com';

  static async getTeams() {
    try {
      const response = await fetch(`${this.apiUrl}/api/v1/matches/teams`, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error(`Teams fetch failed: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.warn('[TeamService] Using fallback teams data:', error);
      return [
        { id: "t1", name: "USA", group: "Group A", flag: "🇺🇸", fifa_ranking: 11, coach: "Gregg Berhalter" },
        { id: "t2", name: "Mexico", group: "Group A", flag: "🇲🇽", fifa_ranking: 14, coach: "Jaime Lozano" },
        { id: "t3", name: "Brazil", group: "Group B", flag: "🇧🇷", fifa_ranking: 5, coach: "Dorival Júnior" },
        { id: "t4", name: "France", group: "Group B", flag: "🇫🇷", fifa_ranking: 2, coach: "Didier Deschamps" }
      ];
    }
  }

  static async getStandings() {
    try {
      const response = await fetch(`${this.apiUrl}/api/v1/matches/standings`, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error(`Standings fetch failed: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.warn('[TeamService] Using fallback standings data:', error);
      return [
        { group: "Group A", teams: [
          { rank: 1, team: "USA", played: 2, won: 2, drawn: 0, lost: 0, gd: 3, points: 6 },
          { rank: 2, team: "Mexico", played: 2, won: 1, drawn: 0, lost: 1, gd: 1, points: 3 }
        ]}
      ];
    }
  }
}
