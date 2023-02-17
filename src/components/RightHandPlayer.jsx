import dragon2 from '../assets/dragon2.svg'

import { useSelector } from 'react-redux'

export default function RightHandPlayer({ data, addCardToStone }) {
  const { isDisabled } = useSelector((state) => state)
  const { stoneSelected } = useSelector((state) => state.stoneSelected)

  const colorVariants = {
    blue: 'from-blue-700',
    yellow: 'from-violet-700',
    green: 'from-green-700',
    orange: 'from-orange-700',
    red: 'from-red-700',
    zinc: 'from-zinc-700',
  }

  return (
    <>
      {data.map((card) => (
        <div key={card.id} className="flex">
          <button
            className={`
            font-card-sides
            text-center text-4xl
            h-32 w-28 font-semibold
            bg-gradient-to-tr ${colorVariants[card.color]} to-zinc-800
            rounded-md p-4
            border border-zinc-700
            transition-colors ease-in-out hover:border-emerald-700 focus:border-emerald-700 duration-300`}
            disabled={isDisabled.right}
            onClick={() => addCardToStone(stoneSelected, card)}
          >
            {card.cardValue}
          </button>
        </div>
      ))}
    </>
  )
}
