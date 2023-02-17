const colors = ['red', 'blue', 'zinc', 'yellow', 'green', 'orange']

function createCards(color) {
  let array = []
  for (var i = 1; i <= 9; i++) {
    array.push({
      id: i + color,
      cardValue: i,
      color: color,
    })
  }
  return array
}

function createDeckOfCards(colors) {
  let arrayDeck = []
  for (var i = 0; i <= colors.length - 1; i++) {
    arrayDeck.push(...createCards(colors[i]))
  }
  return arrayDeck
}

export const deck = createDeckOfCards(colors)

//console.log(deck)
