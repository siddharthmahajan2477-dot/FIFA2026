export interface Ticket {
  id: string | number
  match: string
  date: string
  section: string
  row: number
  seat: number
  price: number
  status: 'active' | 'used' | 'cancelled'
}
