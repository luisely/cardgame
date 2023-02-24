import { createSlice } from '@reduxjs/toolkit'
import { defineState } from 'redux-localstore'

const initialState = defineState({ leftPlayer: [], rightPlayer: [] })('cardsPlayer')

// Slice
const playerCards = createSlice({
  name: 'playersCards',
  initialState,
  reducers: {
    addOneCardToLeft: (state, { payload }) => {
      if (state.leftPlayer.length < 6) {
        state.leftPlayer.push(...payload)
      }
    },
    addCardsToLeft: (state, { payload }) => {
      state.leftPlayer.push(...payload)
      // for (let i = 0; i < payload.length; i++) {
      // }
    },
    removeLeftCardById: (state, { payload }) => {
      state.leftPlayer.splice(
        state.leftPlayer.findIndex((value) => value.id === payload),
        1,
      )
    },
    addOneCardToRight: (state, { payload }) => {
      if (state.rightPlayer.length < 6) {
        state.rightPlayer.push(...payload)
      }
    },
    addCardsToRight: (state, { payload }) => {
      state.rightPlayer.push(...payload)
      // for (let i = 0; i < payload.length; i++) {
      // }
    },
    removeRightCardById: (state, { payload }) => {
      state.rightPlayer.splice(
        state.rightPlayer.findIndex((value) => value.id === payload),
        1,
      )
    },
  },
})
export const {
  addOneCardToLeft,
  addCardsToLeft,
  removeLeftCardById,
  addOneCardToRight,
  addCardsToRight,
  removeRightCardById,
} = playerCards.actions
export default playerCards.reducer
