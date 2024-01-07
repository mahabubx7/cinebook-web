import { Link } from 'react-router-dom'

interface TheaterItemProps {
  theater: Record<string, any>
  movie: number
  date: string
}

export const TheaterItem = (props: TheaterItemProps) => {
  const { theater, movie, date } = props

  return (
    <div className='bg-slate-100 shadow-md shadow-slate-200 px-2 py-3 rounded-md'>
      <h5 className='text-lg font-bold'>{theater.name}</h5>
      <p>{theater.address}</p>
      <small className='bg-gray-200 text-gray-600 py-1 px-1.5 rounded-md'>
        <span className='font-semibold text-gray-500'>{theater.timezone}</span>
      </small>
      {theater.screenings.length > 0 ? (
        <>
          <p className='font-semibold py-1 mb-2'>
            ({theater.screenings.length}) running shows found!
          </p>
          <p className='flex gap-2 flex-wrap'>
            {theater.screenings.map((show: any) => (
              <Link
                key={show.id}
                className='bg-green-50 text-green-600 hover:bg-green-500 hover:text-white font-semibold p-1 px-1.5 rounded-md transition-colors'
                to={`/theater/${theater.id}?movieId=${movie}&showId=${show.id}&date=${date}`}
              >
                <span className='text-sm'>
                  {show.start_time} - {show.end_time}
                </span>
              </Link>
            ))}
          </p>
        </>
      ) : (
        <p className='text-red-400'>No running shows!</p>
      )}
    </div>
  )
}
