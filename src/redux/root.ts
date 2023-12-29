import { combineReducers } from 'redux'
import { authApi, authReducer } from './auth'

const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
