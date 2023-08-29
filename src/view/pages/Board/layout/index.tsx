import { useEffect, useState } from 'react'
import { useBoard } from '../components/BoardContext/useBoard'
import { CardsPlayer } from '../components/CardsPlayer'
import { CenterBoard } from '../components/CenterBoard'
import Confetti from 'react-confetti'
import { Header } from '../components/Header'

type windowSize = {
  width: undefined | number
  height: undefined | number
}

export function Layout() {
  const { playersCards, turnPlayer, winner } = useBoard()
  const [showConfetti, setShowConfetti] = useState(false)
  const [windowSize, setWindowSize] = useState<windowSize>({
    width: undefined,
    height: undefined,
  })

  const handleWindowSize = () => {
    setWindowSize({
      height: window.innerHeight,
      width: window.innerWidth,
    })
  }

  useEffect(() => {
    winner && setShowConfetti(true)
    window.onresize = () => handleWindowSize()
    winner &&
      setTimeout(() => {
        setShowConfetti(false)
      }, 20000)
  }, [winner])

  return (
    <div className="flex flex-col items-center justify-center h-full bg-zinc-800">
      <div className="flex flex-col text-white w-full h-full max-w-xl md:max-w-3xl">
        <Header />
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center gap-1 h-24 md:h-32 w-full p-2">
            <CardsPlayer data={playersCards.top} isDisabled={turnPlayer !== 'top'} player="top" />
          </div>

          <div className="flex-1">
            <CenterBoard />
          </div>

          <div className="flex items-center justify-center gap-1 h-24 md:h-32 w-full p-2">
            <CardsPlayer data={playersCards.bottom} isDisabled={turnPlayer !== 'bottom'} player="bottom" />
          </div>
        </div>
      </div>
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} />}
    </div>
  )
}
