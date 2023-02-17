import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

export default function LeftHandPlayer({ data, addCardToStoneLeft }) {
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
        <div key={card.id}>
          <button
            className={`
            font-card-sides
            text-center text-4xl
            h-32 w-28 font-semibold
            bg-gradient-to-tr ${colorVariants[card.color]} to-zinc-800
            rounded-md p-4
            border border-zinc-700
            transition-colors ease-in-out hover:border-emerald-700 focus:border-emerald-700 duration-300`}
            disabled={isDisabled.left}
            onClick={() => addCardToStoneLeft(stoneSelected, card)}
          >
            {card.cardValue}
          </button>
        </div>
      ))}
    </>
  )
}

LeftHandPlayer.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      cardValue: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
}
