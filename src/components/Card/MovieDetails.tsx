import { parseDate } from '@utils'

interface MovieDetailsProps {
  movie: any
}

export const MovieDetails = (props: MovieDetailsProps) => {
  const { movie } = props

  return (
    <div className='movie__info'>
      <div className='movie__info__container'>
        <div className='movie__info__intro'>
          <div className='movie__info__summary'>
            <h2 className='text-4xl font-bold py-4'>
              {movie.info.title} (
              {(movie.info.release_date as string).split('-')[0]})
            </h2>
            <p>
              <strong>Released</strong>: {parseDate(movie.released_at)}
            </p>
            <p>
              <strong>Available Screens</strong>:{' '}
              {(movie.shows as Record<string, string>[]).length} (
              <span className='text-red-400'>
                {(movie.shows as Record<string, string>[]).length > 0
                  ? 'running'
                  : 'upcoming'}
              </span>
              )
            </p>
            <p>
              <strong>Languages</strong>:{' '}
              {(movie.info.spoken_languages as Record<string, string>[])
                .map((lang) => lang.english_name)
                .join(', ')}
            </p>
          </div>
          <img
            className='movie__info__poster'
            alt={movie.uid}
            src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.info.poster_path}`}
          />
        </div>
        <div className='movie__info__details'>
          <p>Details or necessary information goes here ...</p>
        </div>
      </div>
    </div>
  )
}
