import { BookingRequest, useAddBookingMutation } from '@redux/booking'
import { useState } from 'react'

interface IAuditorium {
  auditoriumId: number
  showId: number
  date: string
  seats: string[]
}

interface ConfirmedRecord {
  auditoriumId: number
  bookingId: number
}

export const AuditoriumCard = (props: IAuditorium) => {
  const { auditoriumId, showId, date, seats } = props
  const [addBooking] = useAddBookingMutation()
  const [confirmed, setConfirmed] = useState<ConfirmedRecord[]>([])
  const [errors, setErrors] = useState<any[]>([])
  const parseSeats = (seats: string[]) => seats.map((seat) => String(seat))
  const handleConfirm = async (auditoriumId: string) => {
    const bookingRequest: BookingRequest = {
      auditoriumId: Number(auditoriumId),
      showId: showId,
      date: date,
      seats: parseSeats(seats),
    }
    try {
      const res = await addBooking(bookingRequest).unwrap()
      for (const booking of res) {
        setConfirmed([
          ...confirmed,
          {
            auditoriumId: Number(auditoriumId),
            bookingId: booking.id,
          },
        ])
      }
    } catch (error) {
      setErrors([...errors, error])
    }
  }

  return (
    <div className='booking__auditoriums__item'>
      <h5>Auditorium ID: {auditoriumId}</h5>
      <div className='booking__seats'>
        <div className='booking__seats__items'>
          {seats.map((seat) => (
            <p key={seat} className='seat'>
              {seat}
            </p>
          ))}
        </div>
        <div className='booking__seats__actions'>
          {errors.length > 0 &&
            errors.map((err, indx) => <p key={indx}>{err}</p>)}
          {errors.length <= 0 &&
          confirmed.find((record) => record.auditoriumId === auditoriumId) ? (
            <>
              <span className='font-semibold uppercase'>✅ confirmed</span>
            </>
          ) : (
            <>
              <button
                className='confirm__btn'
                onClick={() => handleConfirm(String(auditoriumId))}
              >
                Confirm
              </button>
              <button className='cancel__btn'>Cancel</button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
