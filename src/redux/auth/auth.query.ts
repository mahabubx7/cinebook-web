import { baseApiUrl, headersWithToken, responseHandler } from '@redux/helpers'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  User,
} from '@redux/auth'

export const authApi = createApi({
  reducerPath: 'auth_query',
  baseQuery: fetchBaseQuery({ baseUrl: baseApiUrl + '/auth' }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body,
        responseHandler,
      }),
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: '/register',
        method: 'POST',
        body,
        responseHandler,
      }),
    }),
    whoAmI: builder.query<User, void>({
      query: () => ({
        url: '/whoami',
        method: 'GET',
        headers: headersWithToken(),
        responseHandler,
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useWhoAmIQuery,
  useLazyWhoAmIQuery,
  useRegisterMutation,
} = authApi
