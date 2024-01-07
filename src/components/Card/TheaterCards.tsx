import { TheaterItem } from '.'

interface TheaterCardsProps {
  theaters: Record<string, any>[]
  movieId: number
  date: string
  classes?: string
}

export const TheaterCards = (props: TheaterCardsProps) => {
  const { theaters, movieId, date, classes } = props

  return (
    <div className={classes ?? ''}>
      {theaters.length > 0 ? (
        <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3'>
          {theaters.map((theater, indx) => (
            <TheaterItem
              key={indx}
              theater={theater}
              movie={movieId}
              date={date}
            />
          ))}
        </div>
      ) : (
        <p className='text-center'>No running theater were found!</p>
      )}
    </div>
  )
}
