const Router = require('koa-router')
const router = new Router()
const register = require('./register')
const login = require('./login')

router.use(
  '/user',
  register.routes(),
  register.allowedMethods(),
  login.routes(),
  login.allowedMethods()
)

module.exports = router
