import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import { removeRightCardById } from '../store/playerCards'
import { addCardRightPlayer } from '../store/stones'
import { setStoneSelected } from '../store/place'

import * as isDisabledHandle from '../store/isDisabled'

export default function RightHandPlayer({ data }) {
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
        <div key={card.id} className="flex">
          <button
            className={`cards ${colorVariants[card.color]}`}
            disabled={isDisabled.right}
            onClick={() => {
              dispatch(addCardRightPlayer([stoneSelected, card])),
                dispatch(isDisabledHandle.disableRight()),
                dispatch(removeRightCardById(card.id)),
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

RightHandPlayer.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      cardValue: PropTypes.number.isRequired,
      color: PropTypes.string,
    }).isRequired,
  ).isRequired,
}
