import { createSlice } from '@reduxjs/toolkit'
import { defineState } from 'redux-localstore'

import { deck } from '../utils/Cards'

const initialState = defineState(deck)('deck')

const deck2 = createSlice({
  name: 'deck',
  initialState,
  reducers: {
    removeCardsById: (state, { payload }) => {
      for (let i = 0; i < payload.length; i++) {
        state.splice(
          state.findIndex((value) => value.id === payload[i]),
          1,
        )
      }
    },
  },
})

export const { removeCardsById } = deck2.actions
export default deck2.reducer
