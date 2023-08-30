import { memo } from 'react'
import { Card } from '../../../../../app/entities/Card'
import { CardButton } from '../../../../components/CardButton'

type CardsPlayerProps = {
  data: Card[]
  isDisabled: boolean
  player: 'top' | 'bottom'
}

export const CardsPlayer = memo(function CardsPlayer({ data, isDisabled, player }: CardsPlayerProps) {
  return (
    <>
      {data.map((card) => (
        <div key={card.id}>
          <CardButton card={card} isDisabled={isDisabled} player={player} />
        </div>
      ))}
    </>
  )
})
