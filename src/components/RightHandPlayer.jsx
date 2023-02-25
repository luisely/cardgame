import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import { setStoneSelected } from '../store/place'
import { removeRightCardById } from '../store/playerCards'
import { addCardRightPlayer } from '../store/stones'

import * as isDisabledHandle from '../store/isDisabled'

//

export default function RightHandPlayer({ data }) {
  const dispatch = useDispatch()
  const { isDisabled } = useSelector((state) => state)
  const { stoneSelected } = useSelector((state) => state.stoneSelected)
  const stones = useSelector((state) => state.stones)

  const colorVariants = {
    blue: 'from-blue-700',
    yellow: 'from-violet-700',
    green: 'from-green-700',
    orange: 'from-orange-700',
    red: 'from-red-700',
    zinc: 'from-zinc-700',
  }

  const handleAddCard = (cardToStone) => {
    if (stoneSelected === 0) return
    const { right } = stones.find((value) => value.id === stoneSelected)

    if (right.length < 3) {
      dispatch(addCardRightPlayer([stoneSelected, cardToStone]))
      dispatch(isDisabledHandle.disableRight())
      dispatch(removeRightCardById(cardToStone.id))
      dispatch(setStoneSelected(0))
    } else {
      return
    }
  }

  return (
    <>
      {data.map((card) => (
        <div key={card.id} className="flex">
          <button
            className={`cards ${colorVariants[card.color]}`}
            disabled={isDisabled.right}
            onClick={() => handleAddCard(card)}
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
