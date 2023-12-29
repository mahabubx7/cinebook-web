import { createSlice, PayloadAction } from '@reduxjs/toolkit'
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
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<LoginResponse>) {
      state.token = action.payload.token.token
      localStorage.setItem('token', JSON.stringify(state.token))
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload
      localStorage.setItem('user', JSON.stringify(state.user))
      localStorage.setItem('is_authenticated', JSON.stringify(true))
    },
    logout(state) {
      state.token = null
      state.isAuthenticated = false
      localStorage.setItem('is_authenticated', JSON.stringify(false))
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
  },
})

export const { setToken, setUser, logout } = authSlice.actions

export const getToken = (state: { auth: AuthState }) => state.auth.token
export const isAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated
export const getUser = (state: { auth: AuthState }) => state.auth.user
export const getRole = (state: { auth: AuthState }) => state.auth.user.role

export const authReducer = authSlice.reducer
