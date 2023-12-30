import { baseApiUrl, baseHeaders } from '@redux/helpers'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const movieApi = createApi({
  reducerPath: 'movie_query',
  baseQuery: fetchBaseQuery({ baseUrl: baseApiUrl + '/movie' }),
  endpoints: (builder) => ({
    getMovies: builder.query<any, void>({
      query: () => ({
        url: '/',
        method: 'GET',
        headers: baseHeaders,
        cache: 'default',
      }),
    }),
  }),
})

export const { useGetMoviesQuery } = movieApi
