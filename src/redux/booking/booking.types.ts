export interface BookingRequest {
  auditoriumId: number
  showId: number
  date: string
  seats: string[]
}

export interface BookingResponseItem {
  id: number
  owner_id: number
  show_id: number
  date: string
  seat_number: string
  price: number
  created_at: string
  updated_at: string
}

export type BookingResponse = BookingResponseItem[]

export interface BookingRecordItem {
  id: number
  owner_id: number
  show_id: number
  auditorium_id: number
  ticket_id: number | null
  date: string
  seat_number: string
  price: number
  status: 'pending' | 'booked'
  created_at: string
  updated_at: string
}

export type BookingRecords = BookingRecordItem[]
