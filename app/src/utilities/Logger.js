import { createLogger } from 'redux-logger'

const Logger = createLogger({
  duration: false,
  timestamp: true,
  collapsed: (getState, action, logEntry) => !logEntry.error,
  level: 'log', // 'log' | 'warn' | 'error' | 'info'
  logErrors: true
})

export default Logger
