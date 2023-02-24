import { useDispatch } from 'react-redux'
import { setStoneSelected } from '../store/place'
import PropTypes from 'prop-types'

const botoes = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export default function Board({ data, results }) {
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
    <div className="">
      <div className="grid grid-cols-9 gap-1 items-end">
        {data.map((stone) => (
          <div key={stone.id} id={stone.id}>
            <div className="">
              {results.stonesFinalScore.final[stone.id - 1] === 'left' ? (
                <button className="winner">WINNER</button>
              ) : null}
            </div>
            {stone.left.map((card) => (
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
        ))}
      </div>

      <div className="grid grid-cols-9 gap-1">
        {botoes.map((value) => (
          <div key={value}>
            <button className="stones" onClick={() => dispatch(setStoneSelected(value))}>
              STONE <span>{value}</span>
            </button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-9 gap-1 items-start">
        {data.map((stone) => (
          <div key={stone.id} id={stone.id}>
            {stone.right.map((card) => (
              <div
                key={card.id}
                className={`mt-1 font-card-sides font-semibold border border-slate-600 p-4 rounded-md bg-gradient-to-tr ${
                  colorVariants[card.color]
                } to-zinc-800`}
              >
                <div className="text-4xl text-center ">{card.cardValue}</div>
              </div>
            ))}
            <div className="mb-50">
              {results.stonesFinalScore.final[stone.id - 1] === 'right' ? (
                <button className="winner">WINNER</button>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      {/* {stone.right.map((card) => (
        <div
          key={card.id}
          className={`mt-1 font-card-sides font-semibold border border-slate-600 p-4 rounded-md bg-gradient-to-tr ${
            colorVariants[card.color]
          } to-zinc-800`}
        >
          <div className="text-4xl text-center ">{card.cardValue}</div>
        </div>
      ))}

      <div className="mb-50">
        {results.stonesFinalScore.final[stone.id - 1] === 'right' ? <button className="winner">WINNER</button> : null}
      </div> */}
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
