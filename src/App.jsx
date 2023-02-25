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

  useEffect(() => {
    drawSixInitialCards()
  }, [])

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
    console.log(rightPoints)
  }

  useEffect(() => {
    checkTheWinner()
  }, [turn])

  console.log(stones)
  return (
    <div className="h-screen text-white items-center">
      <div className="flex gap-1 justify-center">
        <LeftHandPlayer data={leftPlayer} />
      </div>

      <div className="flex items-center grow justify-between h-[72%]">
        <div className="flex flex-col justify-center items-center">
          <div className="flex font-card-other -mt-6">
            <p className="tracking-widest">{turn.toUpperCase()} PLAY</p>
          </div>
          <button className="btn-buy" onClick={() => handleBuyCard(turn)}>
            BUY CARD - {deck.length}
          </button>
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
      <div className="flex flex-wrap gap-1 justify-center">
        <RightHandPlayer data={rightPlayer} />
      </div>
    </div>
  )
}

export default App
