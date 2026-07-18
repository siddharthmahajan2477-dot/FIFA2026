export interface AIProvider {
  generateText(prompt: string, agentType?: string): Promise<string>
  getExecutiveDashboardInsights(): Promise<any>
  getDigitalTwinTelemetry(): Promise<any[]>
  getIncidentIntelligence(): Promise<any[]>
  getCommandCenterInsights(): Promise<any[]>
  getSearchReports(query: string): Promise<any[]>
}

export class AIService {
  private static apiUrl: string = process.env.NEXT_PUBLIC_API_URL || 'https://fifa-smart-stadium-backend.onrender.com'

  static async generateText(prompt: string, agentType: string = 'default'): Promise<string> {
    try {
      const response = await fetch(`${this.apiUrl}/api/v1/ai/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify({
          message: prompt,
          agent_type: agentType,
          stream: false
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch AI response');
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('AI Service Error:', error);
      return "I'm sorry, I'm currently unable to connect to the backend AI services.";
    }
  }

  static async getExecutiveDashboardInsights(): Promise<any> {
    // Generate a structured JSON summary from the Executive agent
    try {
      const response = await this.generateText("Generate a JSON summary of executive insights including kpis, healthScores, predictions, and risks. Return ONLY raw JSON.", "executive");
      // Attempt to parse the response as JSON (stripping markdown codeblocks if necessary)
      const cleanJson = response.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      return JSON.parse(cleanJson);
    } catch {
      return { kpis: [], healthScores: [], predictions: [], risks: [] };
    }
  }

  static async getDigitalTwinTelemetry(): Promise<any[]> {
    try {
      const response = await this.generateText("Generate an array of JSON objects representing digital twin telemetry updates. Return ONLY raw JSON array.", "operations");
      const cleanJson = response.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      return JSON.parse(cleanJson);
    } catch {
      return [];
    }
  }

  static async getIncidentIntelligence(): Promise<any[]> {
    try {
      const response = await this.generateText("Generate an array of JSON objects representing live security incidents. Return ONLY raw JSON array.", "security");
      const cleanJson = response.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      return JSON.parse(cleanJson);
    } catch {
      return [];
    }
  }

  static async getCommandCenterInsights(): Promise<any[]> {
    try {
      const response = await this.generateText("Generate an array of JSON objects representing command center insights. Return ONLY raw JSON array.", "operations");
      const cleanJson = response.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      return JSON.parse(cleanJson);
    } catch {
      return [];
    }
  }

  static async getSearchReports(query: string): Promise<any[]> {
    try {
      const response = await this.generateText(`Generate an array of JSON search report results for the query: ${query}. Return ONLY raw JSON array.`, "executive");
      const cleanJson = response.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      return JSON.parse(cleanJson);
    } catch {
      return [];
    }
  }
}
