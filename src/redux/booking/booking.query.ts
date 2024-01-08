import { baseApiUrl, headersWithToken, responseHandler } from '@redux/helpers'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BookingRecords, BookingRequest, BookingResponse } from '.'

export const bookingApi = createApi({
  reducerPath: 'booking_query',
  baseQuery: fetchBaseQuery({ baseUrl: baseApiUrl + '/booking' }),
  endpoints: (builder) => ({
    addBooking: builder.mutation<BookingResponse, BookingRequest>({
      query: (args) => ({
        url: '/',
        method: 'POST',
        body: args,
        headers: headersWithToken(),
        responseHandler,
      }),
    }),
    getPendingBookings: builder.query<BookingRecords, void>({
      query: () => ({
        url: '/pending',
        method: 'GET',
        headers: headersWithToken(),
        responseHandler,
      }),
    }),
  }),
})

export const {
  useAddBookingMutation,
  useGetPendingBookingsQuery,
  useLazyGetPendingBookingsQuery,
} = bookingApi
