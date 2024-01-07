import { useGetSeatsQuery } from '@redux/auditorium'
import './style.scss'
import { Button, Modal, SeatItem } from '@components'
import { useState } from 'react'

interface ISeats {
  auditoriumId: number
  showId: number
  date: string
  onClose: () => void
}

export const SeatsModal = (props: ISeats) => {
  const { auditoriumId, showId, date, onClose } = props
  const [selected, setSelected] = useState<string[]>([])
  const handleSelectSeat = (seatNumber: string) => {
    if (selected.length >= 10) {
      alert('You can only select 10 seats at a time!')
      return
    }
    selected.includes(seatNumber)
      ? setSelected(selected.filter((seat) => seat !== seatNumber))
      : setSelected([...selected, seatNumber])
  }
  const {
    data: seats,
    isLoading,
    isError,
  } = useGetSeatsQuery({
    auditoriumId: auditoriumId,
    showId: showId,
    date: date,
  })
  if (isError) return <p className='text-red-400'>Something went wrong!</p>
  if (isLoading) return <p>Loading...</p>

  return (
    <Modal onClose={onClose}>
      <div className='seats'>
        <h5 className='font-semibold text-xl text-center uppercase mb-4'>
          Select your seats!
        </h5>
        <div className='flex items-center justify-between py-2'>
          <p className='text-gray-600 font-semibold text-lg'>
            <span>Seats Available: </span>
            <span className='text-green-600'>
              {seats &&
                seats.filter((seat: any) => seat.status === 'available').length}
            </span>
          </p>
          {selected.length > 0 && (
            <Button
              type='button'
              text='Book Ticket'
              customClass
              className='py-1.5 px-3 bg-green-50 text-green-600 border-2 border-green-200 rounded-md hover:text-white hover:bg-green-600 hover:border-green-600 transition-colors'
            />
          )}
        </div>

        {seats && seats.length > 0 ? (
          <>
            <p className='text-center uppercase font-bold text-2xl bg-gray-200 text-gray-500 rounded-lg p-8 w-full max-w-[720px] mx-auto mt-2.5 mb-8'>
              Screen!
            </p>
            <div className='seats__container'>
              {seats.map((seat: any, indx: number) => (
                <SeatItem
                  key={indx}
                  seat={seat}
                  onClick={handleSelectSeat}
                  isSelected={selected.includes(seat.seat_number)}
                />
              ))}
            </div>
          </>
        ) : (
          <p className='text-red-400'>No seats found!</p>
        )}
      </div>
    </Modal>
  )
}
