import { produce } from 'immer'
import _ from 'lodash'
import React, { createContext, useCallback, useState } from 'react'
import { Card } from '../../../../../app/entities/Card'
import { Stones } from '../../../../../app/entities/Stones'
import { deck } from '../../../../../utils/deck'
import { useStone } from './useStone'

export interface PlayerCards {
  top: Card[]
  bottom: Card[]
}

export type RemoveCardFromPlayerProps = (player: 'top' | 'bottom') => (cardToBeRemoved: Card) => void

interface BoardContextProps {
  deck: Card[]
  winner: string
  stones: Stones[]
  stoneSelected: number
  turnPlayer: 'top' | 'bottom'
  playersCards: PlayerCards
  isRulesModalOpen: boolean
  handleWinner(): void
  changeTurnPlayer(): void
  openRulesModal(): void
  closeRulesModal(): void
  handleChangeStone(value: number): void
  getNewCard(player: 'top' | 'bottom'): void
  removeCardFromPlayer: RemoveCardFromPlayerProps
  isAllowDrop(stoneIndex: number, player: 'top' | 'bottom'): boolean
  addCardToStone(stoneIndex: number, card: Card, player: 'top' | 'bottom'): void
  handlePlaceCardOnStone(player: 'top' | 'bottom', stoneIndex: number, card: Card): void
}

export const BoardContext = createContext({} as BoardContextProps)

const shuffledDeck = _.shuffle(deck)

const startTopPlayerCards = shuffledDeck.slice(0, 6).sort((a, b) => a.cardValue - b.cardValue)
const startBottomPlayerCards = shuffledDeck.slice(6, 12).sort((a, b) => a.cardValue - b.cardValue)

const startDeck = shuffledDeck.slice(12)

export function BoardProvider({ children }: { children: React.ReactNode }) {
  const { stones, addCardToStone } = useStone()
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false)
  const [winner, setWinner] = useState('')
  const [stoneSelected, setStoneSelected] = useState<number>(9)
  const [deckOfCards, setDeckOfCards] = useState<Card[]>(startDeck)
  const [turnPlayer, setTurnPlayer] = useState<'top' | 'bottom'>('top')
  const [playersCards, setPlayersCards] = useState<PlayerCards>({
    top: startTopPlayerCards,
    bottom: startBottomPlayerCards,
  })

  const openRulesModal = useCallback(() => {
    setIsRulesModalOpen(true)
  }, [])

  const closeRulesModal = useCallback(() => {
    setIsRulesModalOpen(false)
  }, [])

  const changeTurnPlayer = useCallback(() => {
    setTurnPlayer((prevState) => (prevState === 'top' ? 'bottom' : 'top'))
  }, [])

  const getNewCard = useCallback(
    <TPlayer extends keyof PlayerCards>(player: TPlayer) => {
      if (deckOfCards.length < 1) return

      const pickedCard = deckOfCards[0]

      setPlayersCards(
        produce((draft) => {
          draft[player].push(pickedCard)
          draft[player].sort((a, b) => a.cardValue - b.cardValue)
        }),
      )

      setDeckOfCards((prevState) => prevState.filter((card) => card.id !== pickedCard.id))
    },
    [deckOfCards],
  )

  const handleWinner = useCallback(() => {
    const winnerCount = stones.reduce(
      (count, stone) => {
        if (stone.winner === 'top') {
          count.top += 1
        } else if (stone.winner === 'bottom') {
          count.bottom += 1
        }
        return count
      },
      { top: 0, bottom: 0 },
    )

    if (winnerCount.top === 3) {
      setWinner('top')
    }

    if (winnerCount.bottom === 3) {
      setWinner('bottom')
    }
  }, [stones])

  function removeCardFromPlayer<TPlayer extends keyof PlayerCards>(player: TPlayer) {
    return (cardToBeRemoved: Card) => {
      setPlayersCards(
        produce((draft) => {
          draft[player] = draft[player].filter((card) => card.id !== cardToBeRemoved.id)
        }),
      )
    }
  }

  const handleChangeStone = useCallback(
    (index: number) => {
      if (stones[index][turnPlayer].cards.length < 3) {
        setStoneSelected(index)
      } else {
        setStoneSelected(9)
      }
    },
    [stones, turnPlayer],
  )

  const isAllowDrop = useCallback(
    (stoneIndex: number, player: 'top' | 'bottom') => {
      if (stones[stoneIndex][player].cards.length === 3 || turnPlayer !== player) {
        return false
      } else {
        return true
      }
    },
    [stones, turnPlayer],
  )

  const handlePlaceCardOnStone = useCallback(
    (player: 'top' | 'bottom', stoneIndex: number, card: Card) => {
      addCardToStone(stoneIndex, card, player)
      removeCardFromPlayer(player)(card)
      getNewCard(turnPlayer)
      changeTurnPlayer()
    },
    [addCardToStone, getNewCard, turnPlayer, changeTurnPlayer],
  )

  return (
    <BoardContext.Provider
      value={{
        deck: deckOfCards,
        handleChangeStone,
        stoneSelected,
        playersCards,
        getNewCard,
        changeTurnPlayer,
        turnPlayer,
        removeCardFromPlayer,
        handlePlaceCardOnStone,
        stones,
        addCardToStone,
        handleWinner,
        winner,
        isAllowDrop,
        openRulesModal,
        closeRulesModal,
        isRulesModalOpen,
      }}
    >
      {children}
    </BoardContext.Provider>
  )
}
