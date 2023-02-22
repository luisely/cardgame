import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { removeCardsById } from '../store/deck'
import { enableLeft, enableRight } from '../store/isDisabled'
import * as playerCards from '../store/playerCards'
import { nextTurn } from '../store/turn'

export default function handleBuyCard(turnPlayer) {
  const dispatch = useDispatch()
  const deck = useSelector((state) => state.deck)
  const { leftPlayer, rightPlayer } = useSelector((state) => state.playerCards)

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
