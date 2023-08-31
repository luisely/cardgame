import { useDrop } from 'react-dnd'
import { Card } from '../../../../../../app/entities/Card'
import { memo } from 'react'
import { CardButton } from '../../../../../components/CardButton'

export const colorVariants = {
  blue: 'from-blue-700',
  yellow: 'from-violet-700',
  green: 'from-green-700',
  orange: 'from-orange-700',
  red: 'from-red-700',
  zinc: 'from-zinc-700',
}

type DropCardsProps = {
  player: 'top' | 'bottom'
  onDrop: (item: { card: Card; player: 'top' | 'bottom' }) => void
  isAllowDrop(item: { player: 'top' | 'bottom' }): boolean
  cards: Card[]
}

export const DropCards = memo(function DropCards({ cards, player, onDrop, isAllowDrop }: DropCardsProps) {
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: player,
      canDrop: isAllowDrop,
      drop: onDrop,
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [onDrop, player, isAllowDrop],
  )
  const isActive = canDrop && isOver

  return (
    <div
      ref={drop}
      data-active={isActive}
      data-candrop={canDrop}
      data-player={player}
      className="flex data-[candrop=true]:bg-zinc-900/30 items-end justify-center data-[player=bottom]:items-start data-[player=bottom]:pt-1 h-full"
    >
      {cards.map((card) => (
        <CardButton
          key={card.id}
          card={card}
          isDisabled={true}
          player={player}
          canDrag={false}
          className="w-10 h-12 md:w-12 md:h-16"
          dropClassName="text-lg md:text-xl"
        />
      ))}
    </div>
  )
})
