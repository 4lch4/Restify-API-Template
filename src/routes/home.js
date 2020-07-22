const BaseRoute = require('../_bases/BaseRoute')

class HomeRoute extends BaseRoute {
  initBasePath() {
    this.router.get('/', function (req, res, next) {
      res.json({
        message: 'Welcome to the base route.',
        query: req.query
      })
      next()
    })

    this.router.post('/', function (req, res, next) {
      res.json({
        message: `Welcome to the base route.`,
        query: req.query
      })
      next()
    })
  }

  initNamePath() {
    this.router.get('/:name', function (req, res, next) {
      res.json({
        message: `Welcome to the JaskierAPI service ${req.params.name}. Have fun.`,
        query: req.query
      })
      next()
    })
  }

  build() {
    this.initBasePath()
    this.initNamePath()

    return this.router
  }
}

const homeRoute = new HomeRoute()
module.exports = homeRoute.build()
