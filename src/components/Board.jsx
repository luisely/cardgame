import { useDispatch } from 'react-redux'
import { setStoneSelected } from '../store/place'
// import PropTypes from 'prop-types'

export default function Board({ data }) {
  const dispatch = useDispatch()

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
      <div className=" ">
        {data.left.map((card) => (
          <div
            key={card.id}
            className={`mt-1 font-card-sides font-semibold border border-slate-600 p-4 rounded-md bg-gradient-to-tr ${
              colorVariants[card.color]
            } to-zinc-800`}
          >
            <div className="text-4xl text-center ">{card.cardValue}</div>
          </div>
        ))}
        <div className="">
          <button className="stones" onClick={() => dispatch(setStoneSelected(data.id))}>
            STONE <span>{data.id}</span>
          </button>
        </div>

        {data.right.map((card) => (
          <div
            key={card.id}
            className={`mt-1 font-card-sides font-semibold border border-slate-600 p-4 rounded-md bg-gradient-to-tr ${
              colorVariants[card.color]
            } to-zinc-800`}
          >
            <div className="text-4xl text-center ">{card.cardValue}</div>
          </div>
        ))}
      </div>
    </>
  )
}

// Board.propTypes = {
//   data: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       left: PropTypes.arrayOf(
//         PropTypes.shape({
//           id: PropTypes.string.isRequired,
//           cardValue: PropTypes.number.isRequired,
//           color: PropTypes.string.isRequired,
//         }),
//       ).isRequired,
//       right: PropTypes.arrayOf(
//         PropTypes.shape({
//           id: PropTypes.string.isRequired,
//           cardValue: PropTypes.number.isRequired,
//           color: PropTypes.string.isRequired,
//         }),
//       ).isRequired,
//       totalCardsStone: PropTypes.number.isRequired,
//     }).isRequired,
//   ).isRequired,
// }
