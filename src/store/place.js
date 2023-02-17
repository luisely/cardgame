import { createSlice } from '@reduxjs/toolkit'
import { defineState } from 'redux-localstore'

const defaultState = {
  stoneSelected: 0,
}

const initialState = defineState(defaultState)('place')

// Slice
const slice = createSlice({
  name: 'stoneSelected',
  initialState,
  reducers: {
    setStoneSelected: (state, action) => {
      state.stoneSelected = action.payload
    },
  },
})
export const { setStoneSelected } = slice.actions
export default slice.reducer
