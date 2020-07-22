const pkg = require('../../package.json')
const { join } = require('path')

module.exports = {
  appName: pkg.displayName,
  version: pkg.version,
  port: process.env.PORT || 8080,
  logDir: join('..', '..', 'logs'),
  getLogFilePath: filename => join(this.logDir, filename),
  throttleOpts: {
    /** Max 10 concurrent requests (if tokens). */
    burst: 100,

    /** Steady state: 2 request / 1 seconds */
    rate: 2,

    /** Throttle per IP. */
    ip: true
  }
}
