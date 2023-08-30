import { useEffect, useState } from 'react'
import { useBoard } from '../pages/Board/components/BoardContext/useBoard'
import Confetti from 'react-confetti'

type windowSize = {
  width: undefined | number
  height: undefined | number
}

export function ConfettiComp() {
  const { winner } = useBoard()
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
    showConfetti && (
      <div className="w-screen h-screen  fixed inset-0 flex justify-center items-center data-[state=open]:animate-overlayShow ">
        <div className="bg-zinc-800 rounded-md border border-emerald-700 h-7 w-full md:w-full md:max-w-3xl flex items-center justify-center animate-overlayShow text-lg translate-y-7 text-emerald-400 font-medium">
          🎉 {winner.toUpperCase()} WIN
        </div>
        <Confetti width={windowSize.width} height={windowSize.height} />
      </div>
    )
  )
}
