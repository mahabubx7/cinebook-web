import { AuditoriumCard } from '../AuditoriumCard'
import './style.scss'

interface IBooking {
  state: {
    seats: Record<string, string[]>
    showId: number
    date: string
  }
}

export const BookingBucket = (props: IBooking) => {
  const { state } = props
  let { seats, showId, date } = state
  const auditoriums = Object.keys(seats)
  const getSeats = (auditoriumId: string) => seats[auditoriumId]

  return (
    <>
      <div className='booking__container'>
        <div className='booking__auditoriums'>
          {auditoriums.map((auditoriumId) => (
            <AuditoriumCard
              key={auditoriumId}
              seats={getSeats(auditoriumId)}
              showId={showId}
              date={date}
              auditoriumId={Number(auditoriumId)}
            />
          ))}
        </div>
      </div>
    </>
  )
}
