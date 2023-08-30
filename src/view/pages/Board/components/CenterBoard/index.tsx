import React from 'react'
import { useBoard } from '../BoardContext/useBoard'
import { DropCards } from './components/DropCards'

export function CenterBoard() {
  const { handleChangeStone, stones, handlePlaceCardOnStone, isAllowDrop } = useBoard()

  return (
    <div className="flex flex-col justify-center h-full px-1">
      <div className="grid grid-cols-5 grid-rows-[74px_32px_74px] grid-flow-col gap-x-1">
        {stones.map((stone, index) => (
          <React.Fragment key={stone.id}>
            <DropCards
              onDrop={({ card, player }) => handlePlaceCardOnStone(player, index, card)}
              isAllowDrop={({ player }) => isAllowDrop(index, player)}
              player="top"
              cards={stone.top.cards}
            />

            <div>
              <button
                data-winner={!!stone.winner}
                type="button"
                className="stones data-[winner=true]:opacity-50"
                onClick={() => handleChangeStone(index)}
              >
                <span className="tracking-tight md:tracking-normal">
                  {stone.winner ? stone.winner.toUpperCase() + ' WIN' : 'STONE ' + stone.id}
                </span>
              </button>
            </div>

            <DropCards
              player="bottom"
              onDrop={({ card, player }) => handlePlaceCardOnStone(player, index, card)}
              isAllowDrop={({ player }) => isAllowDrop(index, player)}
              cards={stone.bottom.cards}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
