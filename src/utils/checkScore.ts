import { Card } from '../app/entities/Card'

const pointsToAdd = {
  run: 300,
  three: 400,
  colors: 200,
}

// 1. Run + Colors: 500P
// 2. Three:        400P
// 3. Run:          300P
// 4. Colors:       200P
// 5. Sum:          Sum of Points

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
