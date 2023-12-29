import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  token: string | null
}

const initialState: AuthState = {
  token: JSON.parse(localStorage.getItem('token') ?? 'null'),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<Record<string, any>>) {
      state.token = action.payload.data.token.token
      localStorage.setItem('token', JSON.stringify(state.token))
    },
    logout(state) {
      state.token = null
      localStorage.removeItem('token')
    },
  },
})

export const { setToken, logout } = authSlice.actions

export const getToken = (state: { auth: AuthState }) => state.auth.token

export const authReducer = authSlice.reducer
