import { baseApiUrl, headersWithToken } from '@redux/helpers'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { LoginRequest, LoginResponse, User } from '@redux/auth'

export const authApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseApiUrl + '/auth' }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body,
      }),
    }),
    whoAmI: builder.query<User, void>({
      query: () => ({
        url: '/whoami',
        method: 'GET',
        headers: headersWithToken(),
      }),
    }),
  }),
})

export const { useLoginMutation, useWhoAmIQuery, useLazyWhoAmIQuery } = authApi
