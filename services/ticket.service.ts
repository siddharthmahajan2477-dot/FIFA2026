import { Ticket } from '../types/ticket'

export class TicketService {
  static async getTickets(): Promise<Ticket[]> {
        try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/tickets`, {
        headers: { 'Authorization': `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('token') : ''}` }
      });
      if (!response.ok) throw new Error('Fetch failed');
      return await response.json();
    } catch (error) {
      console.error('getTickets Error:', error);
      return [] as any;
    }
  }

  static async purchaseTicket(matchId: string | number, seatInfo: any): Promise<Ticket> {
        try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/purchaseticket`, {
        headers: { 'Authorization': `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('token') : ''}` }
      });
      if (!response.ok) throw new Error('Fetch failed');
      return await response.json();
    } catch (error) {
      console.error('purchaseTicket Error:', error);
      return null as any;
    }
  }
}
