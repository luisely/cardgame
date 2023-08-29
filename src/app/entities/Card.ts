import { colorVariants } from '../../view/pages/Board/components/CenterBoard/components/DropCards'

export interface Card {
  id: string
  cardValue: number
  color: keyof typeof colorVariants
}
