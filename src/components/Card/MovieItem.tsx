import { parseDate } from '@utils/date'
import { Link } from 'react-router-dom'
import './style.scss'

interface MovieInfo {
  movie: Record<string, any>
}

export const MovieItem = (props: MovieInfo) => {
  const { movie } = props

  return (
    <div key={movie.uid} className='movie__card'>
      <img
        className='movie__card__poster'
        src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.info.poster_path}`}
        alt={movie.uid}
      />
      <div className='movie__card__info'>
        <h2 className='font-semibold text-red-500 text-xl'>
          <Link to={`/movie/${movie.uid}`} state={movie}>
            {movie.info.title} (
            {(movie.info.release_date as string).split('-')[0]})
          </Link>
        </h2>

        <small className='inline-flex flex-wrap'>
          <span>🗣️</span>
          <span className='ml-1'>
            {(movie.info.spoken_languages as Record<string, string>[])
              .map((lang) => lang.name)
              .join(', ')}
          </span>
        </small>
        <br />
        <small>Released: {parseDate(movie.released_at)}</small>
        <br />
        <small>
          Theaters: (
          <span className='font-semibold text-red-400'>
            {` ${movie.on_theaters} `}
          </span>
          )
        </small>
        <br />
        <small>
          Screens: {String(movie.total_shows)} (
          <span className='text-red-400'>
            {movie.total_shows > 0 ? 'running' : 'upcoming'}
          </span>
          )
        </small>
      </div>
    </div>
  )
}
