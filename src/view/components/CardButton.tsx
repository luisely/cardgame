import { ComponentProps, memo } from 'react'
import { Card } from '../../app/entities/Card'
import { useDrag } from 'react-dnd'
import { twMerge } from 'tailwind-merge'

const colorVariants = {
  blue: 'from-blue-700',
  yellow: 'from-violet-700',
  green: 'from-green-700',
  orange: 'from-amber-700',
  red: 'from-red-700',
  zinc: 'from-zinc-700',
}

type CardButtonProps = ComponentProps<'button'> & {
  card: Card
  isDisabled: boolean
  player: 'top' | 'bottom'
  canDrag?: boolean
  className?: string
}

export const CardButton = memo(function CardButton({
  card,
  isDisabled,
  player,
  canDrag,
  className,
  ...props
}: CardButtonProps) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: player,
      item: { card, player },
      canDrag,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        handlerId: monitor.getHandlerId(),
      }),
    }),
    [card, player],
  )

  return (
    <button
      {...props}
      ref={drag}
      data-testid={`card`}
      data-d={isDragging}
      type="button"
      disabled={isDisabled}
      className={twMerge(
        'text-center text-5xl w-14 h-20 md:w-20 md:h-28 font-medium',
        'bg-gradient-to-tr to-zinc-800',
        'rounded-md border-r-2 border-b-2 border-slate-500',
        'transition-all hover:border-emerald-700 focus:border-emerald-700',
        'data-[d=true]:opacity-20 disabled:cursor-not-allowed cursor-grab',
        'animate-slideDownAndFade',
        colorVariants[card.color],
        className,
      )}
    >
      {card.cardValue}
    </button>
  )
})
