import { createSlice } from '@reduxjs/toolkit'
import { defineState } from 'redux-localstore'

//const initialTurn = localStorage.getItem('turn') ? JSON.parse(localStorage.getItem('turn')) : 'right'

const defaultState = {
  turn: 'left',
}

const initialState = defineState(defaultState)('turn')

// Slice
const slice = createSlice({
  name: 'turn',
  initialState,
  reducers: {
    nextTurn: (state, action) => {
      state.turn = action.payload
    },
  },
})
export const { nextTurn } = slice.actions
export default slice.reducer
