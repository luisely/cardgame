import { useEffect } from 'react'
import { FaCircleQuestion } from 'react-icons/fa6'
import { useBoard } from '../BoardContext/useBoard'

export function Header() {
  const { deck, turnPlayer, handleWinner, winner, openRulesModal } = useBoard()

  useEffect(() => {
    handleWinner()
  }, [handleWinner])

  return (
    <div className="after:content-[''] after:w-full after:h-1 after:block after:my-1 after:bg-gradient-to-r after:from-zinc-800 after:via-green-500 after:to-zinc-800">
      <div className="flex h-10 justify-between items-center w-full">
        <div className="w-1/3 flex items-center">
          <button
            className="text-lg font-medium px-2 hover:text-emerald-500 transition-colors"
            onClick={openRulesModal}
          >
            <FaCircleQuestion className="h-5 w-5" />
          </button>
        </div>

        <div className="text-lg flex text-orange-500 justify-center w-2/3 font-medium text-center">
          {(winner && <span>{winner.toUpperCase()} WIN!</span>) || <span>{turnPlayer.toUpperCase()} TURN</span>}
        </div>

        <div className="text-lg font-medium px-2 text-end w-1/3">CARDS {deck.length}</div>
      </div>
    </div>
  )
}
