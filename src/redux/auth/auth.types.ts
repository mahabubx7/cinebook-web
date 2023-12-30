export interface User {
  id: number
  name: string
  email: string
  role: string
  phone: string | null
  is_active: boolean
  is_deleted: boolean
  is_email_verified: boolean
  created_at: string
  updated_at: string
} // <--- User interface

/* LOGIN */
export interface LoginRequest {
  email: string
  password: string
} // <--- Login request body

export interface LoginResponse {
  message: string
  token: {
    token: string
    type: string
    expires_at: string
  }
} // <--- Login response

/* REGISTER */
export interface RegisterRequest {
  fname: string
  lname: string
  middle?: string
  email: string
  password: string
  password_confirmation: string
} // <--- Register request body

export interface RegisterResponse {
  message: string
  user: User
  token: {
    token: string
    type: string
    expires_at: string
  }
} // <--- Register response
