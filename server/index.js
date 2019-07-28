const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()
const SimpleLogger = require('simple-logger')
const logger = new SimpleLogger(process.env.NODE_ENV === 'development')
const aes256 = require('aes256')
const NodeRSA = require('node-rsa')
const cron = require('node-cron')
let key = new NodeRSA({
  b: 2048
})

const autoRegenRSA = () => {
  key = new NodeRSA({
    b: 2048
  })

  cron.schedule('0 0 * * *', autoRegenRSA, { scheduled: true })
}

autoRegenRSA()

app.use(async (ctx, next) => {
  logger.log(`${ctx.method} ${ctx.url} ${ctx.headers.toString()} from ${ctx.ip}`)
  if (typeof ctx.request.body !== 'undefined') {
    if (typeof ctx.request.body.key !== 'undefined') {
      const aesKey = key.decrypt(ctx.request.body.key, 'utf8')
      ctx.request.key = aesKey
      ctx.request.content = JSON.parse(aes256.decrypt(aesKey, ctx.request.body.data))
    }
  }
  await next()
})

app.on('error', (err) => {
  logger.error(err)
})

router.get('/res/public', (ctx) => {
  ctx.body = { key }
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(4567, () => {
  logger.start('The server is started!')
})
