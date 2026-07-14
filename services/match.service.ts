export class MatchService {
  private static apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  static async getMatches() {
    try {
      const response = await fetch(`${this.apiUrl}/api/v1/matches`, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error(`Matches fetch failed: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.warn('[MatchService] Using fallback match fixtures:', error);
      return [
        { id: "m101", home_team: "USA", away_team: "Mexico", home_score: 2, away_score: 1, status: "LIVE", minute: 74, venue: "MetLife Stadium, East Rutherford", kickoff: "2026-06-11T20:00:00Z", stage: "Group Stage - Group A" },
        { id: "m102", home_team: "Brazil", away_team: "France", home_score: 0, away_score: 0, status: "SCHEDULED", minute: 0, venue: "SoFi Stadium, Los Angeles", kickoff: "2026-06-12T18:00:00Z", stage: "Group Stage - Group B" }
      ];
    }
  }

  static async getLiveMatch() {
    try {
      const response = await fetch(`${this.apiUrl}/api/v1/matches/live`, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error(`Live match fetch failed: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.warn('[MatchService] Using fallback live match telemetry:', error);
      return {
        id: "m101",
        home_team: { name: "USA", flag: "🇺🇸", code: "USA" },
        away_team: { name: "Mexico", flag: "🇲🇽", code: "MEX" },
        score: { home: 2, away: 1 },
        status: "IN_PROGRESS",
        minute: 74,
        possession: { home: 54, away: 46 },
        shots_on_target: { home: 6, away: 4 },
        venue: "MetLife Stadium, East Rutherford",
        events: [
          { time: "14'", player: "Pulisic", team: "USA", type: "GOAL" },
          { time: "38'", player: "Lozano", team: "MEX", type: "GOAL" },
          { time: "62'", player: "McKennie", team: "USA", type: "GOAL" }
        ]
      };
    }
  }

  static async getCountdown() {
    try {
      const response = await fetch(`${this.apiUrl}/api/v1/matches/countdown`, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error(`Countdown fetch failed: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.warn('[MatchService] Using fallback countdown telemetry:', error);
      return {
        next_match: "USA vs Mexico",
        kickoff_timestamp: "2026-06-11T20:00:00Z",
        seconds_remaining: 86400,
        venue: "MetLife Stadium"
      };
    }
  }
}
