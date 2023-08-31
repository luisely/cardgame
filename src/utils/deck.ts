type Colors = ['red', 'blue', 'zinc', 'yellow', 'green', 'orange']

const colors: Colors = ['red', 'blue', 'zinc', 'yellow', 'green', 'orange']

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export const deck = colors.flatMap((color) => {
  return array.map((value) => ({
    id: value + color,
    cardValue: value,
    color,
  }))
})

// export const deck2: Card[] = [
//   { id: '1red', cardValue: 1, color: 'red' },
//   { id: '2red', cardValue: 2, color: 'red' },
//   { id: '3red', cardValue: 3, color: 'red' },
//   { id: '4red', cardValue: 4, color: 'red' },
//   { id: '5red', cardValue: 5, color: 'red' },
//   { id: '1blue', cardValue: 1, color: 'blue' },
//   { id: '2blue', cardValue: 2, color: 'blue' },
//   { id: '3blue', cardValue: 3, color: 'blue' },
//   { id: '4blue', cardValue: 4, color: 'blue' },
//   { id: '5blue', cardValue: 5, color: 'blue' },
//   { id: '1zinc', cardValue: 1, color: 'zinc' },
//   { id: '2zinc', cardValue: 2, color: 'zinc' },
//   { id: '3zinc', cardValue: 3, color: 'zinc' },
//   { id: '4zinc', cardValue: 4, color: 'zinc' },
//   { id: '5zinc', cardValue: 5, color: 'zinc' },
//   { id: '1yellow', cardValue: 1, color: 'yellow' },
//   { id: '2yellow', cardValue: 2, color: 'yellow' },
//   { id: '3yellow', cardValue: 3, color: 'yellow' },
//   { id: '4yellow', cardValue: 4, color: 'yellow' },
//   { id: '5yellow', cardValue: 5, color: 'yellow' },
//   { id: '1green', cardValue: 1, color: 'green' },
//   { id: '2green', cardValue: 2, color: 'green' },
//   { id: '3green', cardValue: 3, color: 'green' },
//   { id: '4green', cardValue: 4, color: 'green' },
//   { id: '5green', cardValue: 5, color: 'green' },
//   { id: '1orange', cardValue: 1, color: 'orange' },
//   { id: '2orange', cardValue: 2, color: 'orange' },
//   { id: '3orange', cardValue: 3, color: 'orange' },
//   { id: '4orange', cardValue: 4, color: 'orange' },
//   { id: '5orange', cardValue: 5, color: 'orange' },
// ]
