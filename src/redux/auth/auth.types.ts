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
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  message: string
  token: {
    token: string
    type: string
    expires_at: string
  }
}
