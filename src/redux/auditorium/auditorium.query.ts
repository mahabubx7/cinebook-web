import { baseApiUrl, baseHeaders } from '@redux/helpers'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  AuditoriumQueryByShow,
  AuditoriumQuerySeats,
  AuditoriumSeats,
} from './auditorium.types'

export const auditoriumApi = createApi({
  reducerPath: 'auditorium_query',
  baseQuery: fetchBaseQuery({ baseUrl: baseApiUrl + '/auditorium' }),
  endpoints: (builder) => ({
    getByShow: builder.query<any, AuditoriumQueryByShow>({
      query: (args) => ({
        url:
          '/screen?showId=' +
          args.showId +
          '&theaterId=' +
          args.theaterId +
          '&date=' +
          args.date,
        method: 'GET',
        headers: baseHeaders,
        cache: 'default',
      }),
    }),
    getSeats: builder.query<AuditoriumSeats, AuditoriumQuerySeats>({
      query: (args) => ({
        url:
          '/seats?showId=' +
          args.showId +
          '&auditoriumId=' +
          args.auditoriumId +
          '&date=' +
          args.date,
        method: 'GET',
        headers: baseHeaders,
        cache: 'default',
      }),
    }),
  }),
})

export const {
  useGetByShowQuery,
  useLazyGetByShowQuery,
  useGetSeatsQuery,
  useLazyGetSeatsQuery,
} = auditoriumApi
