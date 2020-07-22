const { config, logger } = require('./utils')
const { Router } = require('restify-router')
const router = new Router()

const versioner = require('restify-url-semver')
const restify = require('restify')
const server = restify.createServer({
  name: config.appName,
  version: config.version,
  ignoreTrailingSlash: true,
  log: logger
})

server.pre(versioner({ prefix: '/api' }))

server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.throttle(config.throttleOpts))
server.use(restify.plugins.jsonBodyParser())
server.use(restify.plugins.gzipResponse())
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())

for (const route of require('./routes')) {
  router.add(route.path, route.component)
}

router.applyRoutes(server)

server.on(
  'after',
  restify.plugins.metrics({ server: server }, function onMetrics(err, metrics) {
    logger.trace(
      `${metrics.method} ${metrics.path} ${metrics.statusCode} ${metrics.latency} ms`
    )
    if (err) logger.error(err)
  })
)

server.listen(config.port, function () {
  logger.info('%s listening at %s', server.name, server.url)
})

server.on('uncaughtException', function (req, res, route, err) {
  logger.error(err)
})
