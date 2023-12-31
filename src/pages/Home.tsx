import { MovieItem } from '@components'
import { useGetMoviesQuery, setMovies } from '@redux/movies'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export const HomePage = () => {
  const dispatch = useDispatch()
  const { data, isLoading, isError, isSuccess, isFetching } =
    useGetMoviesQuery()

  useEffect(() => {
    if (isSuccess) {
      const { meta, data: movies } = data
      dispatch(setMovies({ meta, movies }))
    }
  }, [isFetching])

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p className='text-red-600'>Something went wrong!</p>

  return (
    <div className='container'>
      <h1 className='font-bold text-2xl pt-3 text-center'>★ On Trending ★</h1>
      <div className='w-[100%] py-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
        {isSuccess &&
          data.data.map((movie: any) => (
            <MovieItem key={movie.uid} movie={movie} />
          ))}
      </div>
    </div>
  )
}
