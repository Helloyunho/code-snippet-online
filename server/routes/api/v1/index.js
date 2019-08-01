const Router = require('koa-router')
const fs = require('fs')
const router = new Router()

fs.readdirSync(__dirname).forEach(file => {
  if (file !== 'index.js') {
    const innerRouter = require(`./${file}`)
    router.use('/v1', innerRouter.routes(), innerRouter.allowedMethods())
  }
})

module.exports = router
