import { useGetMoviesQuery } from '@redux/movies'

export const HomePage = () => {
  const { data, isLoading, isError, isSuccess } = useGetMoviesQuery()

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error!</div>

  const movies = data.data

  return (
    <div className='container'>
      <h1>Welcome!</h1>
      <p>
        This home page will display some recommended (running) movies! Those
        will be displayed using slider
      </p>
      <p>And also a slider for upcoming movies showcase!</p>

      <div>
        {isSuccess &&
          movies.map((movie: any) => (
            <div key={movie.id}>
              <img
                className='w-1/2'
                src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.info.belongs_to_collection.poster_path}`}
                alt={movie.uid}
              />
              <h2 className='font-semibold text-red-500 text-xl'>
                {movie.info.title} (
                {(movie.info.release_date as string).split('-')[0]})
              </h2>
              <p>
                Languages:{' '}
                {(movie.info.spoken_languages as Record<string, string>[])
                  .map((lang) => lang.english_name)
                  .join(', ')}
              </p>
              <p>Released Date: {movie.info.release_date}</p>
              <small>
                Shows: {(movie.shows as Record<string, string>[]).length} (
                <span className='text-red-400'>running</span>)
              </small>
            </div>
          ))}
      </div>
    </div>
  )
}
