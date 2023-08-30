import { colorVariants } from '../../view/pages/Board/components/CenterBoard/components/DropCards'

export type Card = {
  id: string
  cardValue: number
  color: keyof typeof colorVariants
}
