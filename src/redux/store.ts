import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import rootReducer, { RootState } from './root'
import { authApi } from './auth'
import { movieApi } from './movies'
import { auditoriumApi } from './auditorium'

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      movieApi.middleware,
      auditoriumApi.middleware,
    ),
})

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>
