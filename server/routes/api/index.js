const Router = require('koa-router')
const v1 = require('./v1')
const router = new Router()

router.use('/api', v1.routes(), v1.allowedMethods())

module.exports = router
