import _ from 'lodash'

export default (stones) => {
  const leftCards = []
  const leftColorsResult = []
  const leftCardsSumResults = []

  const rightCards = []
  const rightCardsSumResults = []
  const rightColorsResult = []

  for (let i = 0; i < stones.length; i++) {
    leftCards.push(
      stones[i].left.map((card) => ({
        cardId: card.id,
        card: card.cardValue,
        color: card.color,
      })),
    )
  }

  for (let i = 0; i < stones.length; i++) {
    rightCards.push(
      stones[i].right.map((card) => ({
        cardId: card.id,
        card: card.cardValue,
        color: card.color,
      })),
    )
  }

  for (let i = 0; i < leftCards.length; i++) {
    const value = leftCards[i].map((result) => result.card)
    const valueColor = leftCards[i].map((result) => result.color)
    leftColorsResult.push(valueColor)
    leftCardsSumResults.push(_.sum(value))
  }

  for (let i = 0; i < rightCards.length; i++) {
    const value = rightCards[i].map((result) => result.card)
    const valueColor = rightCards[i].map((result) => result.color)
    rightCardsSumResults.push(_.sum(value))
    rightColorsResult.push(valueColor)
  }

  const checkIsColorRun = (stoneId, player) => {
    if (player[stoneId].length === 3) {
      const result2 = checkIsColor(stoneId, player)
      const result1 = checkIsRun(stoneId, player)

      if (result1 === 200 && result2 === 300) {
        return result2 + result1
      } else {
        return 0
      }
    }
    return 0
  }

  const checkIsThreeOfaKind = (stoneId, player) => {
    if (player[stoneId].length === 3) {
      const value = player[stoneId].map((result) => result.card)
      if (value.every((x, i, a) => a[i] === a[0])) {
        return 400
      } else {
        return 0
      }
    }
    return 0
  }

  const checkIsColor = (stoneId, player) => {
    if (player[stoneId].length === 3) {
      const value = player[stoneId].map((result) => result.color)
      if (value.every((x, i, a) => a[i] === a[0])) {
        return 300
      } else {
        return 0
      }
    }
    return 0
  }

  const checkIsRun = (stoneId, player) => {
    if (player[stoneId].length === 3) {
      const result = []
      result.push(player[stoneId].map((result) => result.card))

      const myOrderedArray = _.sortBy(result[0])

      for (var i = 1; i < myOrderedArray.length; i++) {
        if (myOrderedArray[i] !== myOrderedArray[i - 1] + 1) return 0
      }

      return 200
    }
    return 0
  }

  const checkScoreStone = () => {
    let leftSide = []
    let rightSide = []
    let final = []

    for (let i = 0; i <= 8; i++) {
      if (leftCards[i].length > 2 && rightCards[i].length > 2) {
        if (checkIsColorRun(i, leftCards) > 0) {
          leftSide[i] = checkIsColorRun(i, leftCards)
        } else if (checkIsThreeOfaKind(i, leftCards) > 0) {
          leftSide[i] = checkIsThreeOfaKind(i, leftCards)
        } else if (checkIsColor(i, leftCards) > 0) {
          leftSide[i] = checkIsColor(i, leftCards)
        } else if (checkIsRun(i, leftCards) > 0) {
          leftSide[i] = checkIsRun(i, leftCards)
        } else {
          leftSide[i] = leftCardsSumResults[i]
        }

        if (checkIsColorRun(i, rightCards) > 0) {
          rightSide[i] = checkIsColorRun(i, rightCards)
        } else if (checkIsThreeOfaKind(i, rightCards) > 0) {
          rightSide[i] = checkIsThreeOfaKind(i, rightCards)
        } else if (checkIsColor(i, rightCards) > 0) {
          rightSide[i] = checkIsColor(i, rightCards)
        } else if (checkIsRun(i, rightCards) > 0) {
          rightSide[i] = checkIsRun(i, rightCards)
        } else {
          rightSide[i] = rightCardsSumResults[i]
        }

        if (leftSide[i] > rightSide[i]) {
          final[i] = 'left'
        }
        if (rightSide[i] > leftSide[i]) {
          final[i] = 'right'
        }
        if (leftSide[i] === rightSide[i]) {
          if (leftCardsSumResults[i] > rightCardsSumResults[i]) {
            final[i] = 'left'
          }
          if (leftCardsSumResults[i] < rightCardsSumResults[i]) {
            final[i] = 'right'
          }

          if (leftCardsSumResults[i] === rightCardsSumResults[i]) {
            final[i] = 0
          }

          if (leftSide[i] < 0 && rightSide[i] < 0) {
            if (Math.abs(leftCardsSumResults[i]) > Math.abs(rightCardsSumResults[i])) {
              final[i] = 'left'
            } else if (Math.abs(leftCardsSumResults[i]) < Math.abs(rightCardsSumResults[i])) {
              final[i] = 'right'
            } else {
              final[i] = 0
            }
          }
        }
      }
    }

    return {
      leftSide,
      rightSide,
      final,
    }
  }

  const result = checkScoreStone()

  return {
    results: {
      left: leftCards,
      leftResultSumStonesCards: leftCardsSumResults,
      right: rightCards,
      rightResultSumStonesCards: rightCardsSumResults,
      stonesFinalScore: result,
    },
  }

  // stone1.left.map((card) => {
  //   console.log(card.cardValue)
  // })
}

//gere um array de objetos com nome de carros, com id, name, e price
