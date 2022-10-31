import { configureStore } from '@reduxjs/toolkit'
import detailsReducer, { IDetailsState } from '../features/details/detailsSlice'
import homeReducer, { IHomeState } from '../features/home/homeSlice'

export interface IStore {
  home: IHomeState
  details: IDetailsState
}

export const store = configureStore({
  reducer: {
    home: homeReducer,
    details: detailsReducer
  }
})

export type AppDispatch = typeof store.dispatch
