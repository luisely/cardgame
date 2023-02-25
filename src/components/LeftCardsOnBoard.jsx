import React from 'react'
import { useSelector } from 'react-redux'

export default function LeftCardsOnBoard({ results }) {
  const stones = useSelector((state) => state.stones)

  const colorVariants = {
    blue: 'from-blue-700',
    yellow: 'from-violet-700',
    green: 'from-green-700',
    orange: 'from-orange-700',
    red: 'from-red-700',
    zinc: 'from-zinc-700',
  }

  return (
    <div className="grid grid-cols-9 gap-1 items-end h-80">
      {stones.map((stone) => (
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
  )
}
