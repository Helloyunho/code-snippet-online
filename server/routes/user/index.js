const Router = require('koa-router')
const router = new Router()
const register = require('./register')

router.use('/user', register.routes(), register.allowedMethods())

module.exports = router
