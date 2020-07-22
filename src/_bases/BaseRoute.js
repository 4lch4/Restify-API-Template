const { Router } = require('restify-router')

class BaseRoute {
  constructor() {
    this.router = new Router()
  }
}

module.exports = BaseRoute
