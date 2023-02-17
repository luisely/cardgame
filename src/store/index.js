import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import turn from './turn'
import isDisabled from './isDisabled'
import stoneSelected from './place'

import storeSynchronize from 'redux-localstore'

const reducer = combineReducers({
  turn,
  isDisabled,
  stoneSelected,
})

const store = configureStore({ reducer })

export default store
storeSynchronize(store)
