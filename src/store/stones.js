import { createSlice } from '@reduxjs/toolkit'
import { defineState } from 'redux-localstore'

import { stoneInitial } from '../utils/Stones'

const initialState = defineState(stoneInitial)('stonesTeste')

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
        stoneToUpdated.left.push(newCard)
      }
    },
    addCardRightPlayer: (state, { payload }) => {
      const [stoneId, newCard] = payload

      if (stoneId === 0) return
      const stoneToUpdated = state.find((t) => t.id === stoneId)
      if (stoneToUpdated.right.length < 3) {
        stoneToUpdated.right.push(newCard)
      }
    },
  },
})
export const { addCardLeftPlayer, addCardRightPlayer } = stones.actions
export default stones.reducer
