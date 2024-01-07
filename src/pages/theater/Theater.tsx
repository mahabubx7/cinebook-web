import { AuditoriumCards } from '@components'
import { parseQs } from '@utils'
import { useLocation } from 'react-router-dom'

export const TheaterPage = () => {
  const { search, pathname } = useLocation()
  const theaterId = pathname.split('/').pop()
  const { movieId, showId, date } = parseQs(search)
  const checks = () => {
    return (
      !theaterId ||
      !movieId ||
      !showId ||
      !date ||
      theaterId.trim().length <= 0 ||
      movieId.trim().length <= 0 ||
      showId.trim().length <= 0 ||
      date.trim().length <= 0
    )
  }

  if (checks())
    return (
      <p className='text-red-400 font-bold text-center pt-10 text-2xl'>
        Theater, Movie, Show & Date are required!
      </p>
    )

  return (
    <div className='container'>
      <div className='pb-10'></div>
      <div className='bg-slate-100 px-2 py-4 rounded-lg'>
        <h2 className='font-bold text-gray-700 text-2xl uppercase text-center mb-3'>
          Book your seats!
        </h2>
        <AuditoriumCards
          theater={Number(theaterId)}
          show={Number(showId)}
          date={String(date)}
        />
      </div>
    </div>
  )
}
