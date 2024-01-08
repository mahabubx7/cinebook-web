import { Button, SeatsModal } from '@components'
import { useGetByShowQuery, useLazyGetSeatsQuery } from '@redux/auditorium'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './style.scss'

type AuditoriumCardsProps = {
  theater: number
  show: number
  date: string
}

export type ManageSeats = {
  total: number
  cost: number
  chosen: Record<string, string[]>
  currentAuditorium?: string
  errors: string[]
}

export const AuditoriumCards = (props: AuditoriumCardsProps) => {
  const { theater, show, date } = props

  const [isSeatsOpen, setSeatsOpen] = useState(false)
  const [seatState, setTheSeatState] = useState<ManageSeats>({
    total: 0,
    cost: 0,
    chosen: {},
    errors: [],
    currentAuditorium: undefined,
  })

  const [querySeats, { data: seatsArr }] = useLazyGetSeatsQuery()

  const handleFetchSeats = async (id: string) => {
    await querySeats({
      showId: show,
      date: date,
      auditoriumId: Number(id),
    })
      .unwrap()
      .catch((err) => err)
      .then(() => {
        setSeatsOpen(true)
        setTheSeatState({
          ...seatState,
          currentAuditorium: id,
        })
      })
  }

  const handleSelectingSeats = (
    seatNumber: string,
    auditoriumId: string,
    price: number,
  ) => {
    if (seatState.chosen[auditoriumId]?.includes(seatNumber)) {
      setTheSeatState({
        ...seatState,
        total: seatState.total - 1,
        cost: seatState.cost - price,
        chosen: {
          ...seatState.chosen,
          [auditoriumId]: seatState.chosen[auditoriumId].filter(
            (seat) => seat !== seatNumber,
          ),
        },
      })
    } else {
      if (seatState.total >= 10) {
        alert('You can only select 10 seats at a time!')
        return
      }
      setTheSeatState({
        ...seatState,
        total: seatState.total + 1,
        cost: seatState.cost + price,
        chosen: {
          ...seatState.chosen,
          [auditoriumId]: [
            ...(seatState.chosen[auditoriumId] || []),
            seatNumber,
          ],
        },
      })
    }
  }

  const {
    data: auditoriums,
    isLoading,
    isError,
  } = useGetByShowQuery({ theaterId: theater, showId: show, date: date })

  if (isError) return <p className='text-red-400'>Something went wrong!</p>
  if (isLoading) return <p>Loading...</p>

  return (
    <div className='auditoriums'>
      <div className='my-2 bg-gray-200 px-2.5 py-4 rounded-md'>
        <p>
          <strong>Total Selected</strong>: {seatState.total}
        </p>

        <p className='text-wrap'>
          {Object.keys(seatState.chosen).length > 0 && (
            <strong>Selected Seats:</strong>
          )}
          {Object.keys(seatState.chosen).map((auditoriumId) => (
            <span key={auditoriumId}>
              <br />
              <span key={auditoriumId}>
                Auditorium ({auditoriumId}):{' '}
                {seatState.chosen[auditoriumId].join(', ')}
              </span>
            </span>
          ))}
          <br />
          <span>Estimated Cost: {Math.ceil(seatState.cost)} BDT</span>
          <br />
          <span>
            Total Cost: {Math.ceil(seatState.cost * 1.1)} BDT (with 10% VAT
            included)
          </span>
          <br />
          <span className='w-full text-center lg:text-right inline-block mt-4'>
            <Button
              text='Go Back!'
              customClass
              onClick={() => window.history.back()}
              className='go__back__btn'
            />
            <Link
              to={`/ticket`}
              state={{
                seats: seatState.chosen,
                cost: seatState.cost,
                showId: show,
                date: date,
              }}
              className='book__now__btn'
            >
              Book Ticket Now
            </Link>
          </span>
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {auditoriums.map((auditorium: Record<string, any>) => (
          <div
            className='bg-gray-50 border-2 border-gray-200 rounded-md p-2 mt-5'
            key={auditorium.uid}
          >
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
                  triggerAsync={() => handleFetchSeats(auditorium.id)}
                />
              </span>

              {isSeatsOpen && (
                <SeatsModal
                  seats={seatsArr!}
                  auditoriumId={Number(seatState.currentAuditorium!)}
                  selected={
                    seatState.chosen[seatState.currentAuditorium!] || []
                  }
                  onClose={() => setSeatsOpen(!isSeatsOpen)}
                  onAdd={handleSelectingSeats}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
