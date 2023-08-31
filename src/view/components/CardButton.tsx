import { ComponentProps, memo } from 'react'
import { Card } from '../../app/entities/Card'
import { useDrag } from 'react-dnd'
import { twMerge } from 'tailwind-merge'

import diamond from '../assets/diamond.svg'

const colorVariants = {
  blue: 'bg-blue-700',
  yellow: 'bg-violet-700',
  green: 'bg-green-700',
  orange: 'bg-amber-700',
  red: 'bg-red-700',
  zinc: 'bg-zinc-700',
}

type CardButtonProps = ComponentProps<'button'> & {
  card: Card
  isDisabled: boolean
  player: 'top' | 'bottom'
  canDrag?: boolean
  className?: string
  dropClassName?: string
}

export const CardButton = memo(function CardButton({
  card,
  isDisabled,
  player,
  canDrag,
  className,
  dropClassName,
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
        'text-center w-14 h-20 md:w-20 md:h-28 text-3xl md:text-4xl',
        'rounded-md ',
        'transition-all hover:bg-slate-100',
        'data-[d=true]:opacity-20 disabled:cursor-not-allowed cursor-grab',
        'animate-slideDownAndFade',
        className,
      )}
    >
      <div className={twMerge(' h-[96%] m-[2px] rounded flex items-center justify-center', colorVariants[card.color])}>
        <div className=" flex bg-no-repeat items-center justify-center bg-center relative">
          <img src={diamond} alt="" className="h-20" />
          <p className={twMerge('drop-shadow-2xl absolute font-jetBrains italic', dropClassName)}>{card.cardValue}</p>
        </div>
      </div>
    </button>
  )
})
