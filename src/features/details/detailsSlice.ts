import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IStore } from '../../app/store'
import { IMovie } from '../../interfaces/movie'
import { IShow } from '../../interfaces/show'
import { getMovieDetails, getSimilarMovies } from '../../providers/movies'
import { getShowDetails, getSimilarShows } from '../../providers/shows'

type Item = IMovie & IShow

export interface IDetailsState {
  item: Item | null
  similarItems: Item[]
  loading: boolean
  error: boolean
}

const initialState: IDetailsState = {
  item: null,
  similarItems: [],
  loading: false,
  error: true
}

export const getItemDetails = createAsyncThunk(
  'details/getItemDetails',
  async (args: { id: number }, thunkAPI) => {
    try {
      const store = thunkAPI.getState() as IStore

      if (!store.home.selectedItem?.name) {
        return await getMovieDetails(args.id)
      }

      return await getShowDetails(args.id)
    } catch (error) {
      return thunkAPI.rejectWithValue('Something went wrong')
    }
  }
)

export const getSimilarItems = createAsyncThunk(
  'details/getSimilarItems',
  async (args: { id: number }, thunkAPI) => {
    try {
      const store = thunkAPI.getState() as IStore

      if (!store.home.selectedItem?.name) {
        return await getSimilarMovies(args.id)
      }

      return await getSimilarShows(args.id)
    } catch (error) {
      return thunkAPI.rejectWithValue('Something went wrong')
    }
  }
)

const detailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getItemDetails.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getItemDetails.fulfilled, (state, action) => {
      state.loading = false
      state.error = false
      state.item = action.payload
    })
    builder.addCase(getItemDetails.rejected, (state) => {
      state.loading = false
      state.error = true
    })
    builder.addCase(getSimilarItems.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getSimilarItems.fulfilled, (state, action) => {
      state.loading = false
      state.error = false
      state.similarItems = action.payload.results
    })
    builder.addCase(getSimilarItems.rejected, (state) => {
      state.loading = false
      state.error = true
    })
  }
})

export default detailsSlice.reducer
