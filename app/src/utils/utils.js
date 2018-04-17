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

export const formatToNum = (string) => parseInt(string)

export const formatDateForApi = date => {
  return moment(date).format('YYYYMMDD')
}

export const formatTimeInHhMmAndRemoveSpecialChars = timeString => {
  return timeString.toString().split(':').join('')
}
