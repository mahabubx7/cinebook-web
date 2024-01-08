import { Modal, SeatItem } from '@components'
import './style.scss'
interface ISeats {
  seats: Record<string, any>[]
  auditoriumId: number
  selected: string[]
  onClose: () => void
  onAdd: (seat: string, auditorium: string, price: number) => void
}

export const SeatsModal = (props: ISeats) => {
  const { seats, selected, auditoriumId, onClose, onAdd } = props

  const handleOnAdd = (seatNumber: string) => {
    const currentSeat = seats?.find(
      (seat: any) => seat.seat_number === seatNumber,
    )
    if (currentSeat?.status === 'booked' || currentSeat?.status === 'pending') {
      alert('Sorry! This seat is already booked or in-processing!')
      return
    } else {
      onAdd(seatNumber, String(auditoriumId), currentSeat!.price)
    }
  }

  return (
    <Modal onClose={onClose}>
      <div className='seats'>
        <h5 className='font-semibold text-xl text-center uppercase mb-4'>
          Select your seats!
        </h5>
        <small className='inline-block text-center mx-auto w-full font-semibold text-lg'>
          Auditorium ID: {auditoriumId}
        </small>
        <div className='flex flex-col items-center justify-between py-2'>
          <p className='text-gray-600 font-semibold text-lg'>
            <span>Seats Available: </span>
            <span className='text-green-600'>
              {seats &&
                seats.filter((seat: any) => seat.status === 'available').length}
            </span>
          </p>

          <p className='flex gap-x-3 justify-start items-center'>
            <span className='inline-flex items-center justify-start gap-2'>
              <span className='bg-green-400 w-4 h-4 rounded-full inline-block' />
              <span>Available</span>
            </span>

            <span className='inline-flex items-center justify-start gap-2'>
              <span className='bg-red-400 w-4 h-4 rounded-full inline-block' />
              <span>Booked</span>
            </span>

            <span className='inline-flex items-center justify-start gap-2'>
              <span className='bg-gray-400 w-4 h-4 rounded-full inline-block' />
              <span>Pending</span>
            </span>

            <span className='inline-flex items-center justify-start gap-2'>
              <span className='bg-green-700 w-4 h-4 rounded-full inline-block' />
              <span>Selected</span>
            </span>
          </p>
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
                  onClick={() => handleOnAdd(seat.seat_number)}
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
