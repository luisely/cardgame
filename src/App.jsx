import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import _ from 'lodash'

import { disableLeft, enableLeft, disableRight, enableRight } from './store/isDisabled'
import { setStoneSelected } from './store/place'
import { nextTurn } from './store/turn'

import { useLocalStorage } from './utils/useLocalStorage'
import cardsOnStones from './utils/checkStones'
import { stoneInitial } from './utils/Stones'
import { deck } from './utils/Cards'

import RightHandPlayer from './components/RightHandPlayer'
import LeftHandPlayer from './components/LeftHandPlayer'
import Board from './components/Board'

import './styles/global.css'

function App() {
  const dispatch = useDispatch()
  const { turn } = useSelector((state) => state.turn)
  const [stones, setStones] = useLocalStorage('game', stoneInitial)

  const [cardsRightPlayer, setCardsRightPlayer] = useLocalStorage('cardsRightPlayer', [])
  const [cardsleftPlayer, setCardsLeftPlayer] = useLocalStorage('cardsLeftPlayer', [])
  const [deckOfCards, setDeckOfCards] = useLocalStorage('deck', deck)

  const { results } = cardsOnStones(stones)

  const updateDeck = (deckToUpdate, idsCards) => {
    return deckToUpdate.filter((value) => !idsCards.includes(value.id))
  }

  const drawSixInitialCards = () => {
    const deckNew = [...deckOfCards]
    const rightHandCards = _.sampleSize(deckNew, 6)
    const idCardsRightHands = rightHandCards.map((card) => card.id)

    setCardsRightPlayer(rightHandCards)

    const updatedDeck = updateDeck(deckNew, idCardsRightHands)

    const leftHandCards = _.sampleSize(updatedDeck, 6)
    const idCardsLeftHands = leftHandCards.map((card) => card.id)

    const finalDeck = updateDeck(updatedDeck, idCardsLeftHands)

    setCardsLeftPlayer(leftHandCards)
    setDeckOfCards(finalDeck)
  }

  const handleBuyCard = (turnPlayer) => {
    const deckNew = [...deckOfCards]
    if (deckNew.length >= 1) {
      if (turnPlayer === 'right') {
        if (cardsRightPlayer.length < 6) {
          const rightPlayerNewCard = _.sampleSize(deckNew, 1)
          const idCardsRightHands = rightPlayerNewCard.map((card) => card.id)
          setCardsRightPlayer([...cardsRightPlayer, rightPlayerNewCard[0]])
          const finalDeck = updateDeck(deckNew, idCardsRightHands)
          setDeckOfCards(finalDeck)
          dispatch(nextTurn('left'))
          dispatch(enableLeft())
        } else {
          return
        }
      }

      if (turnPlayer === 'left') {
        if (cardsleftPlayer.length < 6) {
          const leftPlayerNewCard = _.sampleSize(deckNew, 1)
          const idCardsLeftHands = leftPlayerNewCard.map((card) => card.id)
          setCardsLeftPlayer([...cardsleftPlayer, leftPlayerNewCard[0]])
          const finalDeck = updateDeck(deckNew, idCardsLeftHands)
          setDeckOfCards(finalDeck)
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

  const removeCardHandRightPlayer = (id) => {
    setCardsRightPlayer(cardsRightPlayer.filter((card) => card.id !== id))
    console.log('delete card', id)
  }

  const removeCardHandLeftPlayer = (id) => {
    setCardsLeftPlayer(cardsleftPlayer.filter((card) => card.id !== id))
    console.log('delete card', id)
  }

  const addCardToStone = (stoneId, newCard) => {
    turn === 'right' &&
      setStones(
        stones.map((stone) => {
          if (stone.id === stoneId) {
            if (stone.right.length < 3) {
              removeCardHandRightPlayer(newCard.id)
              dispatch(setStoneSelected(0))
              dispatch(disableRight())
              return {
                ...stone,
                totalCardsStone: stone.totalCardsStone + 1,
                right: [...stone.right, newCard],
              }
            } else {
              return stone
            }
          } else {
            return stone
          }
        }),
      )
  }

  const addCardToStoneLeft = (stoneId, newCard) => {
    turn === 'left' &&
      setStones(
        stones.map((stone) => {
          if (stone.id === stoneId) {
            if (stone.left.length < 3) {
              removeCardHandLeftPlayer(newCard.id)
              dispatch(setStoneSelected(0))
              dispatch(disableLeft())
              return {
                ...stone,
                totalCardsStone: stone.totalCardsStone + 1,
                left: [...stone.left, newCard],
              }
            } else {
              return stone
            }
          } else {
            return stone
          }
        }),
      )
  }

  useEffect(() => {
    if (deckOfCards.length === 54) {
      drawSixInitialCards()
    }
  }, [])

  function clearStorage() {
    localStorage.clear()

    window.location.reload(true)
  }
  console.log(results.stonesFinalScore)
  return (
    <>
      <div className="h-screen text-white flex flex-col justify-between">
        <div className="flex flex-wrap gap-2 justify-center">
          <LeftHandPlayer data={cardsleftPlayer} addCardToStoneLeft={addCardToStoneLeft} />
        </div>
        <div className="flex flex-wrap justify-center h-full">
          <div className="flex flex-col justify-center items-center">
            <div className="flex font-card-other -mt-6">
              <p className="tracking-widest">{turn.toUpperCase()} PLAY</p>
            </div>
            <button
              className={`
              font-card-other
              italic
              tracking-widest
              bg-gradient-to-tr from-teal-900 to-zinc-800
              border border-zinc-700
              rounded-md p-5 text-lg
              transition-colors ease-in-out hover:border-emerald-700 focus:border-emerald-700 duration-300`}
              onClick={() => handleBuyCard(turn)}
            >
              BUY CARD - {deckOfCards.length}
            </button>
          </div>
          <div className="h-auto flex flex-wrap gap-2 justify-center items-center grow">
            {stones.map((stone, i) => (
              <Board key={i} data={stone} />
            ))}
          </div>
          <div className="flex flex-wrap justify-center items-center gap-2">
            <button
              className={`
              tracking-widest
              italic
              font-card-other
              bg-gradient-to-tr from-red-900 to-zinc-800
              border border-zinc-700
              rounded-md p-5 text-lg
              transition-colors ease-in-out hover:border-emerald-700 focus:border-emerald-700 duration-300`}
              onClick={() => clearStorage()}
            >
              RESTART
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          <RightHandPlayer data={cardsRightPlayer} addCardToStone={addCardToStone} />
        </div>
      </div>
    </>
  )
}

export default App
