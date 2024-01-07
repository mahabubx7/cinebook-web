import { Button, SeatsModal } from '@components'
import { useGetByShowQuery } from '@redux/auditorium'
import './style.scss'
import { useState } from 'react'

type AuditoriumCardsProps = {
  theater: number
  show: number
  date: string
}

export const AuditoriumCards = (props: AuditoriumCardsProps) => {
  const { theater, show, date } = props
  const [isSeatsOpen, setSeatsOpen] = useState(true)
  const toggleSeats = () => setSeatsOpen(!isSeatsOpen)
  const {
    data: auditoriums,
    isLoading,
    isError,
  } = useGetByShowQuery({ theaterId: theater, showId: show, date: date })
  if (isError) return <p className='text-red-400'>Something went wrong!</p>
  if (isLoading) return <p>Loading...</p>
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
      {auditoriums.map((auditorium: Record<string, any>) => (
        <div className='bg-gray-50 rounded-md p-2 mt-5' key={auditorium.uid}>
          <h2 className='text-2xl font-bold text-gray-700'>
            {auditorium.name}
          </h2>
          <div className='flex flex-wrap justify-between gap-1 pt-3'>
            <p className='flex flex-col'>
              <span>Total Seats: {auditorium.capacity}</span>
              <span>Available Seats: {auditorium.seats.available}</span>
            </p>

            <span>
              <Button
                text='Open Seats'
                className='open__seat__btn'
                customClass
                onClick={toggleSeats}
              />
            </span>
          </div>

          {isSeatsOpen && (
            <SeatsModal
              auditoriumId={auditorium.id}
              showId={show}
              date={date}
              onClose={toggleSeats}
            />
          )}
        </div>
      ))}
    </div>
  )
}
