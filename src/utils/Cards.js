const colors = ['red', 'blue', 'zinc', 'yellow', 'green', 'orange']

function freshDeck() {
  return colors.flatMap((color) => {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => {
      return { id: value + color, cardValue: value, color }
    })
  })
}

export const deck = freshDeck()
