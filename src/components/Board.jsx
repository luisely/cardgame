import { useDispatch } from 'react-redux'
import { setStoneSelected } from '../store/place'

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
          <button
            className={`
            tracking-wider
              mt-1
              font-card-other
              bg-gradient-to-tr from-zinc-900 to-zinc-800
              border border-zinc-700
              rounded-md p-5 text-lg
              transition-colors ease-in-out hover:text-emerald-600 hover:border-emerald-700 focus:border-emerald-700 focus:text-emerald-600 duration-300`}
            onClick={() => dispatch(setStoneSelected(data.id))}
          >
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
