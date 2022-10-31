import { configureStore } from '@reduxjs/toolkit'
import homeReducer, { IHomeState } from '../features/home/homeSlice'

export interface IStore {
  home: IHomeState
}

export const store = configureStore({
  reducer: {
    home: homeReducer
  }
})

export type AppDispatch = typeof store.dispatch
