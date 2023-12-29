import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apiUrl = import.meta.env.VITE_API_URI

interface LoginRequest {
  email: string
  password: string
}

export const authApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl + '/auth' }),
  endpoints: (builder) => ({
    login: builder.mutation<any, LoginRequest>({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useLoginMutation } = authApi
