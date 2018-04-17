import moment from 'moment'

export const formatDateBy_ddmmyyyy = date => moment(date).format('D MMMM YYYY')

export const formatDateForApi = date => moment(date).format('YYYYMMDD')

export const formatTime = time => time.replace(':', '')
