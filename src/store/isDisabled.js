import { createSlice } from '@reduxjs/toolkit'
import { defineState } from 'redux-localstore'

const defaultState = { right: false, left: true }

const initialState = defineState(defaultState)('isDisabled')

// Slice
const slice = createSlice({
  name: 'isDisabled',
  initialState,
  reducers: {
    disableLeft: (state) => {
      state.left = true
    },
    enableLeft: (state) => {
      state.left = false
    },
    disableRight: (state) => {
      state.right = true
    },
    enableRight: (state) => {
      state.right = false
    },
  },
})
export const { disableLeft, enableLeft, disableRight, enableRight } = slice.actions
export default slice.reducer
