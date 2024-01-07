export interface AuditoriumQueryByShow {
  showId: number
  theaterId: number
  date: string
}

export interface AuditoriumQuerySeats {
  showId: number
  auditoriumId: number
  date: string
}

export interface AuditoriumSeat {
  seat_number: number
  status: string
}

export type AuditoriumSeats = AuditoriumSeat[]
