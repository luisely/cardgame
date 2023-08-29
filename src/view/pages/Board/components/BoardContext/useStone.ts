import { useCallback, useReducer } from 'react'
import { stoneInitial } from '../../../../../utils/Stones'
import { Stones } from '../../../../../app/entities/Stones'
import { Card } from '../../../../../app/entities/Card'
import { produce } from 'immer'
import { checkScore } from '../../../../../utils/checkScore'

type StoneAction = {
  payload: {
    stoneIndex: number
    card: Card
    player: 'top' | 'bottom'
  }
}

const reducer = produce((draft: Stones[], { payload }: StoneAction) => {
  const stone = draft[payload.stoneIndex]
  stone[payload.player].cards.push(payload.card)
  stone[payload.player].cards.sort((a, b) => a.cardValue - b.cardValue)
  stone[payload.player].points += payload.card.cardValue
  stone.totalCardsStone++
  if (stone[payload.player].cards.length === 3) {
    stone[payload.player].points += checkScore(stone[payload.player].cards)
  }

  if (stone.totalCardsStone === 6) {
    if (stone.top.points > stone.bottom.points) {
      stone.winner = 'top'
    } else if (stone.top.points < stone.bottom.points) {
      stone.winner = 'bottom'
    } else {
      stone.winner = 'tie'
    }
  }
})

export function useStone() {
  const [stones, dispatch] = useReducer(reducer, stoneInitial)

  const addCardToStone = useCallback((stoneIndex: number, card: Card, player: 'top' | 'bottom') => {
    dispatch({
      payload: { stoneIndex, card, player },
    })
  }, [])

  return {
    stones,
    addCardToStone,
  }
}
