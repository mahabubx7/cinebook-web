import { createSlice, PayloadAction } from '@reduxjs/toolkit/react'
import { LoginResponse, User } from '@redux/auth'
interface AuthState {
  token: string | null
  isAuthenticated: boolean
  user: Record<string, any>
}

const initialState: AuthState = {
  token: JSON.parse(localStorage.getItem('token') ?? 'null'),
  isAuthenticated: JSON.parse(
    localStorage.getItem('is_authenticated') ?? 'false',
  ),
  user: JSON.parse(localStorage.getItem('user') ?? '{}'),
}

const authSlice = createSlice({
  name: 'auth',
  reducerPath: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<LoginResponse>) {
      localStorage.setItem('token', JSON.stringify(action.payload.token.token))
      return {
        ...state,
        token: action.payload.token.token,
      }
    },
    setUser(state, action: PayloadAction<User>) {
      localStorage.setItem('user', JSON.stringify(action.payload))
      localStorage.setItem('is_authenticated', JSON.stringify(true))
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      }
    },
    logout(state) {
      localStorage.setItem('is_authenticated', JSON.stringify(false))
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
      }
    },
  },
})

export const { setToken, setUser, logout } = authSlice.actions

export const getToken = (state: { auth: AuthState }) => state.auth.token
export const checkAuth = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated
export const getUser = (state: { auth: AuthState }) => state.auth.user
export const getRole = (state: { auth: AuthState }) => state.auth.user.role

export const authReducer = authSlice.reducer
