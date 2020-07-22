const { logDir, appName } = require('./config')
const bunyan = require('bunyan')
const fs = require('fs')

// create logs directory if not exists.
fs.existsSync(logDir) || fs.mkdirSync(logDir)

const ConsoleStreams = [
  { stream: process.stdout, level: 'info' },
  // { stream: process.stdout, level: 'debug' },
  { stream: process.stderr, level: 'error' },
  { stream: process.stderr, level: 'fatal' }
]

const RotatingFileStreams = [
  {
    type: 'rotating-file',
    path: 'logs/info.log',
    period: '1d',
    level: 'info',
    count: 3
  },
  {
    type: 'rotating-file',
    path: 'logs/error.log',
    period: '1d',
    level: 'error',
    count: 7
  },
  {
    type: 'rotating-file',
    path: 'logs/trace.log',
    period: '1d',
    level: 'trace',
    count: 3
  }
]

module.exports = bunyan.createLogger({
  name: appName,
  streams: [...ConsoleStreams, ...RotatingFileStreams]
})
