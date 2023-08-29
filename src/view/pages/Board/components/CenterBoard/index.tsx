import { useBoard } from '../BoardContext/useBoard'
import { Transition } from '@headlessui/react'
import { DropCards } from './components/DropCards'

export function CenterBoard() {
  const { handleChangeStone, stones, handlePlaceCardOnStone, isAllowDrop } = useBoard()
  const stonesId = stones.map((stone) => stone.id)

  return (
    <div className="flex flex-col justify-center h-full px-1">
      <div className="grid grid-cols-5 gap-1 items-end h-20 md:h-24">
        {stones.map((stone, index) => (
          <DropCards
            key={stone.id}
            onDrop={({ card, player }) => handlePlaceCardOnStone(player, index, card)}
            isAllowDrop={({ player }) => isAllowDrop(index, player)}
            player="top"
            cards={stone.top.cards}
          />
        ))}
      </div>

      <div className="grid grid-cols-5 gap-1">
        {stonesId.map((value, index) => (
          <div key={value}>
            <button type="button" className="stones" onClick={() => handleChangeStone(index)}>
              STONE
              <span className="ml-1">{value}</span>
            </button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-1 items-start h-20 md:h-24">
        {stones.map((stone, index) => (
          <DropCards
            key={stone.id}
            player="bottom"
            onDrop={({ card, player }) => handlePlaceCardOnStone(player, index, card)}
            isAllowDrop={({ player }) => isAllowDrop(index, player)}
            cards={stone.bottom.cards}
          />
        ))}
      </div>

      <div className="grid grid-cols-5">
        {stones.map((stone) => (
          <div key={stone.id} className="h-6">
            <Transition
              show={!!stone.winner}
              enter="transition-all duration-500"
              enterFrom="opacity-0 -translate-y-14"
              enterTo="opacity-100 translate-y-0"
              leave="transition-all duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              className="font-medium text-center tracking-wider -z-20 text-xs md:text-base"
            >
              {stone.winner?.toUpperCase()} WIN
            </Transition>
          </div>
        ))}
      </div>
    </div>
  )
}
