import { useBoard } from '../components/BoardContext/useBoard'
import { CardsPlayer } from '../components/CardsPlayer'
import { CenterBoard } from '../components/CenterBoard/index'
import { Header } from '../components/Header'

export function Layout() {
  const { playersCards, turnPlayer } = useBoard()

  return (
    <div className="flex flex-col items-center justify-center h-full bg-zinc-800">
      <div className="flex flex-col text-white w-full h-full max-w-xl md:max-w-3xl">
        <Header />
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center gap-1 h-24 md:h-32 w-full">
            <CardsPlayer data={playersCards.top} isDisabled={turnPlayer !== 'top'} player="top" />
          </div>

          <div className="flex-1">
            <CenterBoard />
          </div>

          <div className="flex items-center justify-center gap-1 h-24 md:h-32 w-full">
            <CardsPlayer data={playersCards.bottom} isDisabled={turnPlayer !== 'bottom'} player="bottom" />
          </div>
        </div>
      </div>
    </div>
  )
}
