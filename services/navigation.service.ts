export interface MappingProvider {
  getIndoorRoutes(sectionId: string, facilityType: string): Promise<any[]>
}

export class NavigationService {
  private static provider: string = process.env.NEXT_PUBLIC_MAP_PROVIDER || 'default'

  static async getIndoorRoutes(sectionId: string, facilityType: string): Promise<any[]> {
        try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/indoorroutes`, {
        headers: { 'Authorization': `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('token') : ''}` }
      });
      if (!response.ok) throw new Error('Fetch failed');
      return await response.json();
    } catch (error) {
      console.error('getIndoorRoutes Error:', error);
      return [] as any;
    }
  }
}
