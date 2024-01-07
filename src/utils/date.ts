const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

export const parseDate = (date: string) => {
  const dateObj = new Date(date)
  return (
    months[dateObj.getMonth()] +
    ' ' +
    dateObj.getDate() +
    ', ' +
    dateObj.getFullYear()
  )
}

export const makeDates = (
  date: string = new Date().toISOString().split('T')[0],
  range: number = 10,
) => {
  const dateObj = new Date(date)
  // make today & next 9 (10 days as default) days dates as string (yyy-mm-dd)
  const dates = []
  for (let i = 0; i < range; i++) {
    const newDate = new Date(dateObj)
    newDate.setDate(dateObj.getDate() + i)
    dates.push(newDate.toISOString().split('T')[0])
  }
  return dates
}
