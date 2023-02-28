import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { disableLeft, disableRight, enableLeft, enableRight } from './store/isDisabled'
import * as playerCards from './store/playerCards'

import { removeCardsById } from './store/deck'
import { nextTurn } from './store/turn'

import cardsOnStones from './utils/checkStones'

import Board from './components/Board'
import LeftHandPlayer from './components/LeftHandPlayer'
import RightHandPlayer from './components/RightHandPlayer'
import RulesOfGame from './components/RulesOfGame'

import * as Dialog from '@radix-ui/react-dialog'

import { Plus, X } from 'phosphor-react'

import './styles/global.css'

function App() {
  const dispatch = useDispatch()
  const { turn } = useSelector((state) => state.turn)
  const { leftPlayer, rightPlayer } = useSelector((state) => state.playerCards)
  const deck = useSelector((state) => state.deck)
  const stones = useSelector((state) => state.stones)

  const [winner, setWinner] = useState(null)

  const { results } = cardsOnStones(stones)

  const updateDeck = (deckToUpdate, idsCards) => {
    return deckToUpdate.filter((value) => !idsCards.includes(value.id))
  }

  const drawSixInitialCards = () => {
    let ids = []
    if (deck.length === 54) {
      const deckNew = [...deck]
      const rightHandCards = _.sampleSize(deckNew, 6)
      const idCardsRightHands = rightHandCards.map((card) => card.id)

      dispatch(playerCards.addCardsToRight(rightHandCards))

      const updatedDeck = updateDeck(deckNew, idCardsRightHands)

      const leftHandCards = _.sampleSize(updatedDeck, 6)
      const idCardsLeftHands = leftHandCards.map((card) => card.id)

      dispatch(playerCards.addCardsToLeft(leftHandCards))

      ids.push(...idCardsRightHands, ...idCardsLeftHands)
      dispatch(removeCardsById(ids))
    }
  }

  const handleBuyCard = (turnPlayer) => {
    const deckNew = [...deck]
    if (deckNew.length >= 1) {
      if (turnPlayer === 'right') {
        if (rightPlayer.length < 6) {
          const rightPlayerNewCard = _.sampleSize(deckNew, 1)
          const idCardsRightHands = rightPlayerNewCard.map((card) => card.id)

          dispatch(playerCards.addCardsToRight(rightPlayerNewCard))
          dispatch(removeCardsById(idCardsRightHands))

          dispatch(nextTurn('left'))
          dispatch(enableLeft())
        } else {
          return
        }
      }

      if (turnPlayer === 'left') {
        if (leftPlayer.length < 6) {
          const leftPlayerNewCard = _.sampleSize(deckNew, 1)
          const idCardsLeftHands = leftPlayerNewCard.map((card) => card.id)

          dispatch(playerCards.addOneCardToLeft(leftPlayerNewCard))
          dispatch(removeCardsById(idCardsLeftHands))

          dispatch(nextTurn('right'))
          dispatch(enableRight())
        } else {
          return
        }
      }
    } else {
      turnPlayer === 'left' && dispatch(enableRight())
      turnPlayer === 'right' && dispatch(enableLeft())
      dispatch(nextTurn(turnPlayer === 'left' ? 'right' : 'left'))
    }
  }

  function clearStorage() {
    localStorage.clear()

    window.location.reload(true)
  }

  function checkTheWinner() {
    const leftPoints = results.stonesFinalScore.final.filter((x) => x === 'left').length
    const rightPoints = results.stonesFinalScore.final.filter((x) => x === 'right').length
    if (leftPoints > 4) {
      setWinner('left')
      dispatch(disableLeft())
      dispatch(disableRight())
    }
    if (rightPoints > 4) {
      setWinner('right')
      dispatch(disableLeft())
      dispatch(disableRight())
    }
  }

  useEffect(() => {
    drawSixInitialCards()
  }, [])

  useEffect(() => {
    checkTheWinner()
  }, [turn])

  console.log(results.stonesFinalScore)

  return (
    <div className="w-screen h-screen text-white relative">
      <div className="flex gap-1 justify-center h-32">
        <LeftHandPlayer data={leftPlayer} />
      </div>

      <div className="flex items-center grow justify-between">
        <div className="flex flex-col justify-center items-center w-22 gap-1">
          <div className="flex font-card-other text-orange-500 font-thin  gap-1">
            <p className="tracking-widest text-xs md:text-xl md:w-40 text-center">
              {winner ? winner.toUpperCase() + ' WIN' : turn.toUpperCase() + ' TURN'}{' '}
            </p>
          </div>
          <button className="btn-buy" onClick={() => handleBuyCard(turn)}>
            <div>BUY CARD</div>
            <div className="text-xs m-0">({deck.length})</div>
          </button>
          <Dialog.Root>
            <Dialog.Trigger className="btn-rules">Rules</Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="w-screen h-screen bg-black/80 fixed inset-0" />
              <Dialog.Content className="text-white absolute p-8 border border-emerald-700 bg-zinc-900 rounded-xl w-full max-w-2xl top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4 font-card-other text-xl tracking-wide">
                <Dialog.Close className="absolute right-6 top-6 text-zinc-400 hover:text-zinc-200">
                  <X size={24} aria-label="Fechar" />
                </Dialog.Close>
                <Dialog.Title className="text-4xl leading-tight font-semibold text-orange-500 font-card-sides text-center after:content-[''] after:w-full after:h-1 after:block after:my-2 after:bg-gradient-to-r after:from-zinc-900 after:via-green-500 after:to-zinc-900 after:m-auto">
                  Rules of Game
                </Dialog.Title>
                <RulesOfGame />
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
        <div className="flex">
          <Board data={stones} results={results} />
        </div>
        <div className="flex flex-wrap justify-center items-center gap-2">
          <button className="btn-restart" onClick={() => clearStorage()}>
            RESTART
          </button>
        </div>
      </div>
      <div className="flex gap-1 justify-center mt-12 md:mt-7">
        <RightHandPlayer data={rightPlayer} />
      </div>
    </div>
  )
}

export default App
