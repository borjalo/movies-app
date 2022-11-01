import { configureStore } from '@reduxjs/toolkit'
import detailsReducer, { IDetailsState } from '../features/details/detailsSlice'
import homeReducer, { IHomeState } from '../features/home/homeSlice'
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'

export interface IStore {
  home: IHomeState
  details: IDetailsState
}

const persistConfig = {
  key: 'root',
  storage
}

const reducers = combineReducers({
  home: homeReducer,
  details: detailsReducer
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

export type AppDispatch = typeof store.dispatch
