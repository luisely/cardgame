import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import { removeLeftCardById } from '../store/playerCards'
import { addCardLeftPlayer } from '../store/stones'
import { setStoneSelected } from '../store/place'

import * as isDisabledHandle from '../store/isDisabled'

export default function LeftHandPlayer({ data }) {
  const dispatch = useDispatch()
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
            className={`cards ${colorVariants[card.color]}`}
            disabled={isDisabled.left}
            onClick={() => {
              dispatch(addCardLeftPlayer([stoneSelected, card])),
                dispatch(isDisabledHandle.disableLeft()),
                dispatch(removeLeftCardById(card.id)),
                dispatch(setStoneSelected(0))
            }}
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
