import moment from 'moment'

export const formatDateBy_ddmmyyyy = date => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  const day = date.getDate()
  const monthIndex = date.getMonth()
  const year = date.getFullYear()
  
  return day + ' ' + monthNames[monthIndex] + ' ' + year
}

export const formatDateBy_yyyymmdd = date => {
  const fullYear = date.getFullYear()
  const month = date.getMonth() + 1
  const formattedMonth = month < 10 ? `0${month}` : month
  const day = date.getDate()
  return `${fullYear}${formattedMonth}${day}`
}
export const formatToNum = (string) => parseInt(string)

export const formatDateForApi = date => {
  return moment(date).format('YYYYMMDD')
}
