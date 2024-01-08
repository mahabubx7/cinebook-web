import { combineReducers } from 'redux'
import { authApi, authReducer } from './auth'
import { movieApi } from './movies'
import { movieReducer } from './movies/movie.slice'
import { auditoriumApi } from './auditorium'
import { bookingApi } from './booking'

const rootReducer = combineReducers({
  auth: authReducer,
  movies: movieReducer,
  [authApi.reducerPath]: authApi.reducer,
  [movieApi.reducerPath]: movieApi.reducer,
  [auditoriumApi.reducerPath]: auditoriumApi.reducer,
  [bookingApi.reducerPath]: bookingApi.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
