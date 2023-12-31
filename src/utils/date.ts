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
  const dateObj = new Date(JSON.parse(date))
  return (
    months[dateObj.getMonth()] +
    ' ' +
    dateObj.getDate() +
    ' ' +
    dateObj.getFullYear()
  )
}
