import { useGetMovieQuery } from '@redux/movies'
import { IsAuthenticated, makeDates, parseDate } from '@utils'
import { TheaterCards } from './TheaterCards'
import { useState } from 'react'

interface MovieDetailsProps {
  movieUid: string
}

interface DateState {
  dates: string[]
  currentDate: string
}

export const MovieDetails = (props: MovieDetailsProps) => {
  const { movieUid } = props
  const isAuthenticated = IsAuthenticated()

  const [dateState, setDate] = useState<DateState>({
    dates: makeDates(),
    currentDate: new Date().toISOString().split('T')[0],
  })

  const { data: getMovie, isError, isLoading } = useGetMovieQuery(movieUid)

  if (isError) return <p className='text-red-600'>Something went wrong!</p>
  if (isLoading) return <p>Loading...</p>

  return (
    <div className='movie__info'>
      <div className='movie__info__container'>
        <div className='movie__info__intro'>
          <div className='movie__info__summary'>
            <h2 className='text-4xl font-bold py-4'>
              {getMovie.info.title} (
              {(getMovie.info.release_date as string).split('-')[0]})
            </h2>
            <p>
              <strong>Released</strong>: {parseDate(getMovie.released_at)}
            </p>

            <p>
              <strong>C.B Rating</strong>:{' '}
              <span className='bg-gray-200 text-gray-600 font-semibold py-1 px-1.5 rounded-md'>
                {getMovie.rated}
              </span>
            </p>

            <p>
              <strong>Languages</strong>:{' '}
              {(getMovie.info.spoken_languages as Record<string, string>[])
                .map((lang) => lang.english_name)
                .join(', ')}
            </p>
          </div>
          <img
            className='movie__info__poster'
            alt={getMovie.uid}
            src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${getMovie.info.poster_path}`}
          />
        </div>
        {isAuthenticated === true ? (
          <div className='movie__info__details'>
            <h4 className='movie__info__details__header'>Choose a theater!</h4>

            <div className='movie__info__details__theaters'>
              <div className='movie__info__details__theaters__dates'>
                <h4 className='movie__info__details__theaters__dates__header'>
                  Select Date
                </h4>

                <div className='movie__info__details__theaters__dates__list'>
                  {getMovie.theaters.length > 0 ? (
                    dateState.dates.map((date, indx) => (
                      <button
                        key={indx}
                        className={`movie__info__details__theaters__dates__list__btn ${
                          date === dateState.currentDate
                            ? 'bg-green-500 text-white'
                            : 'text-gray-500'
                        }`}
                        onClick={() =>
                          setDate({ ...dateState, currentDate: date })
                        }
                      >
                        {date}
                      </button>
                    ))
                  ) : (
                    <p className='text-center'>
                      No running theaters were found!
                    </p>
                  )}
                </div>
              </div>

              <div className='movie__info__details__theaters__cards'>
                <TheaterCards
                  theaters={getMovie.theaters}
                  movieId={getMovie.id}
                  date={dateState.currentDate}
                />
              </div>
            </div>
          </div>
        ) : (
          <h3 className='text-red-400 text-4xl text-center mt-12 mb-10 py-5 font-semibold'>
            🔐 Login first!
          </h3>
        )}
      </div>
    </div>
  )
}
