import { useLocation } from 'react-router-dom'
import { AuthRequired } from './auth'
import { BookingBucket } from '@components'

export const TicketPage = () => {
  const { state } = useLocation()
  const { seats, cost, showId, date } = state
  return (
    <AuthRequired>
      <div className='container'>
        <h2>Confirm your bookings!</h2>
        <p>Please clear the payment & confirm your ticket!</p>

        <pre>{JSON.stringify(state)}</pre>
        <pre>Date: {date}</pre>
        <pre>Price: {Math.ceil(cost)} BDT</pre>

        <BookingBucket
          state={{
            seats,
            showId,
            date,
          }}
        />
      </div>
    </AuthRequired>
  )
}
