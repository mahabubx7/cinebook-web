import { PayloadAction, createSlice } from '@reduxjs/toolkit/react'

interface MovieCollectionState {
  movies: Record<string, any>[]
  meta: Record<string, any>
}

const initialState: MovieCollectionState = {
  movies: [],
  meta: {},
}

const movieCollectionSlice = createSlice({
  name: 'movies',
  reducerPath: 'movies',
  initialState,
  reducers: {
    setMovies(state, action: PayloadAction<MovieCollectionState>) {
      return {
        ...state,
        movies: action.payload.movies,
        meta: action.payload.meta,
      }
    },
    updateMovies(state, action: PayloadAction<MovieCollectionState['movies']>) {
      return {
        ...state,
        movies: {
          ...state.movies,
          ...action.payload,
        },
      }
    },
    updateMoviesMeta(
      state,
      action: PayloadAction<MovieCollectionState['meta']>,
    ) {
      return {
        ...state,
        meta: {
          ...state.meta,
          ...action.payload,
        },
      }
    },
  },
})

export const { setMovies, updateMovies, updateMoviesMeta } =
  movieCollectionSlice.actions

export const getMovies = (state: MovieCollectionState) => state.movies
export const getMoviesMeta = (state: MovieCollectionState) => state.meta

export const movieReducer = movieCollectionSlice.reducer
