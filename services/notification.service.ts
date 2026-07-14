import { Notification } from '../types/notification'

export class NotificationService {
  static async getNotifications(): Promise<Notification[]> {
        try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/notifications`, {
        headers: { 'Authorization': `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('token') : ''}` }
      });
      if (!response.ok) throw new Error('Fetch failed');
      return await response.json();
    } catch (error) {
      console.error('getNotifications Error:', error);
      return [] as any;
    }
  }

  static async markAsRead(id: string | number): Promise<boolean> {
        try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/markasread`, {
        headers: { 'Authorization': `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('token') : ''}` }
      });
      if (!response.ok) throw new Error('Fetch failed');
      return await response.json();
    } catch (error) {
      console.error('markAsRead Error:', error);
      return null as any;
    }
  }

  static async clearAll(): Promise<boolean> {
        try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/clearall`, {
        headers: { 'Authorization': `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('token') : ''}` }
      });
      if (!response.ok) throw new Error('Fetch failed');
      return await response.json();
    } catch (error) {
      console.error('clearAll Error:', error);
      return null as any;
    }
  }
}
