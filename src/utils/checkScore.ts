import { Card } from '../app/entities/Card'

const pointsToAdd = {
  run: 400,
  three: 300,
  colors: 100,
}

function isSequence(array: Card[]) {
  for (let i = 1; i < array.length; i++) {
    if (array[i].cardValue !== array[i - 1].cardValue + 1) {
      return 0
    }
  }
  return pointsToAdd.run
}

function hasSameColors(array: Card[]) {
  return array.every((card) => card.color === array[0].color) === true ? pointsToAdd.colors : 0
}

function threeOfKind(array: Card[]) {
  return array.every((card) => card.cardValue === array[0].cardValue) === true ? pointsToAdd.three : 0
}

export const checkScore = (cardsOnBoard: Card[]): number => {
  let totalPoints = 0
  const cardsOrdered = cardsOnBoard.slice().sort((a, b) => a.cardValue - b.cardValue)

  totalPoints += isSequence(cardsOrdered) | hasSameColors(cardsOrdered) | threeOfKind(cardsOrdered)

  return totalPoints
}
