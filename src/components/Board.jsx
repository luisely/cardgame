import { useDispatch } from 'react-redux'
import { setStoneSelected } from '../store/place'
import LeftCardsOnBoard from './LeftCardsOnBoard'
import RightCardsOnBoard from './RightCardsOnBoard'
import PropTypes from 'prop-types'

const botoes = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export default function Board({ results }) {
  const dispatch = useDispatch()

  return (
    <div className="">
      <LeftCardsOnBoard results={results} />

      <div className="grid grid-cols-9 gap-1 ">
        {botoes.map((value) => (
          <div key={value}>
            <button className="stones" onClick={() => dispatch(setStoneSelected(value))}>
              STONE <span>{value}</span>
            </button>
          </div>
        ))}
      </div>

      <RightCardsOnBoard results={results} />
    </div>
  )
}

// Board.propTypes = {
//   data: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     left: PropTypes.arrayOf(
//       PropTypes.shape({
//         id: PropTypes.string.isRequired,
//         cardValue: PropTypes.number.isRequired,
//         color: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     right: PropTypes.arrayOf(
//       PropTypes.shape({
//         id: PropTypes.string.isRequired,
//         cardValue: PropTypes.number.isRequired,
//         color: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     totalCardsStone: PropTypes.number.isRequired,
//   }).isRequired,
// }
