import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IItem } from '../../interfaces/item'
import { getPopularMovies } from '../../providers/movies'
import { getPopularShows } from '../../providers/shows'

export interface IHomeState {
  items: IItem[]
  selectedItem: IItem | null | undefined
  loading: boolean
  error: boolean
}

const initialState: IHomeState = {
  items: [],
  selectedItem: null,
  loading: false,
  error: true
}

export const getItems = createAsyncThunk(
  'home/getItems',
  async (_, thunkAPI) => {
    try {
      return await Promise.all([getPopularMovies(), getPopularShows()])
    } catch (error) {
      return thunkAPI.rejectWithValue('Something went wrong')
    }
  }
)

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setSelectedItem: (state, action) => {
      state.selectedItem = state.items.find(
        (item) => item.id === action.payload
      )
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getItems.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getItems.fulfilled, (state, action) => {
      state.loading = false
      state.error = false
      const moviesArray = action.payload[0].results
      const showsArray = action.payload[1].results
      const items = [...moviesArray, ...showsArray]

      state.selectedItem = items[0]
      state.items = [...moviesArray, ...showsArray]
    })
    builder.addCase(getItems.rejected, (state) => {
      state.loading = false
      state.error = true
    })
  }
})

export const { setSelectedItem } = homeSlice.actions

export default homeSlice.reducer
