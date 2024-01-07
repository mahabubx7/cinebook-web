import { MovieDetails } from '@components'
import { useLocation } from 'react-router-dom'

export const Movie = () => {
  const { state } = useLocation()

  return (
    <div className='container'>
      <MovieDetails movieUid={state.uid} />
    </div>
  )
}
