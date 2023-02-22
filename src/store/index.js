import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import storeSynchronize from 'redux-localstore'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import isDisabled from './isDisabled'
import stoneSelected from './place'
import stones from './stones'
import turn from './turn'
import deck from './deck'
import playerCards from './playerCards'

const persistConfig = {
  key: 'GAME-CROSS',
  storage,
}

const reducer = combineReducers({
  turn,
  isDisabled,
  stoneSelected,
  stones,
  deck,
  playerCards,
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})

export const persistor = persistStore(store)
export default store
