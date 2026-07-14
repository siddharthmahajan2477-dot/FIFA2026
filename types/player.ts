export interface Player {
  id: string | number
  name: string
  team: string
  position: 'GK' | 'DF' | 'MF' | 'FW'
  number: number
  goals: number
  assists: number
  rating: number
}
