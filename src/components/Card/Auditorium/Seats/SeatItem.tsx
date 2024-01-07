import './style.scss'

interface SeatItemProps {
  seat: Record<string, any>
  onClick: (seatNumber: string) => void
  isSelected?: boolean
}

export const SeatItem = (props: SeatItemProps) => {
  const { seat, onClick, isSelected = false } = props

  let classes: string = 'seat'
  if (seat.status === 'pending') classes += ' pending'
  else if (seat.status === 'booked') classes += ' booked'
  else if (isSelected) classes += ' selected'
  else classes += ' available'

  return (
    <button
      type='button'
      className={classes}
      onClick={() => onClick(seat.seat_number)}
    >
      <span>{seat.seat_number}</span>
    </button>
  )
}
