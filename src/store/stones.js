import { createSlice } from '@reduxjs/toolkit'
import { defineState } from 'redux-localstore'

import { stoneInitial } from '../utils/Stones'

const initialState = defineState(stoneInitial)('stonesTeste')

function checkAndSetHighestObject(arr, newObj, propName) {
  if (arr.length > 1) {
    let highestObj = arr.reduce((a, b) => (a[propName] > b[propName] ? a : b))
    if (newObj[propName] > highestObj[propName]) {
      arr.splice(arr.indexOf(highestObj), 1)
      arr.push(newObj)
    } else {
      arr.push(newObj)
    }
  } else {
    arr.push(newObj)
  }
}

function orderByLowestValue(arr, propName) {
  return arr.sort((a, b) => a[propName] - b[propName])
}

function orderByHighValue(arr, propName) {
  return arr.sort((a, b) => b[propName] - a[propName])
}

// Slice
const stones = createSlice({
  name: 'stones',
  initialState,
  reducers: {
    addCardLeftPlayer: (state, { payload }) => {
      const [stoneId, newCard] = payload

      if (stoneId === 0) return
      const stoneToUpdated = state.find((t) => t.id === stoneId)
      if (stoneToUpdated.left.length < 3) {
        console.log(stoneToUpdated.left.length)
        //checkAndSetHighestObject(stoneToUpdated.left, newCard, 'cardValue')
        stoneToUpdated.left.push(newCard)
        orderByLowestValue(stoneToUpdated.left, 'cardValue')
      }
    },
    addCardRightPlayer: (state, { payload }) => {
      const [stoneId, newCard] = payload

      if (stoneId === 0) return
      const stoneToUpdated = state.find((t) => t.id === stoneId)
      if (stoneToUpdated.right.length < 3) {
        stoneToUpdated.right.push(newCard)
        orderByHighValue(stoneToUpdated.right, 'cardValue')
      }
    },
  },
})
export const { addCardLeftPlayer, addCardRightPlayer } = stones.actions
export default stones.reducer
