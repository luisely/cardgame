import { Card } from './Card'

export interface Stones {
  id: string
  totalCardsStone: number
  winner: string | null
  top: {
    cards: Card[]
    points: number
  }
  bottom: {
    cards: Card[]
    points: number
  }
}
