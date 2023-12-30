import { combineReducers } from 'redux'
import { authApi, authReducer } from './auth'
import { movieApi } from './movies'
import { movieReducer } from './movies/movie.slice'

const rootReducer = combineReducers({
  auth: authReducer,
  movies: movieReducer,
  [authApi.reducerPath]: authApi.reducer,
  [movieApi.reducerPath]: movieApi.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
