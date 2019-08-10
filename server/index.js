const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
const router = new Router()
const SimpleLogger = require('simple-logger')
const logger = new SimpleLogger(process.env.NODE_ENV === 'development')
const aes256 = require('aes256')
const NodeRSA = require('node-rsa')
const rethinkdb = require('rethinkdb')
const apiRouter = require('./routes/api')
const userRouter = require('./routes/user')
const key = new NodeRSA({
  b: 2048
})
let connection
rethinkdb.connect(
  { host: 'localhost', port: 28015 },
  (err, conn) => {
    if (err) {
      logger.error(err)
    }
    connection = conn
  }
)

app.use(bodyParser({ enableTypes: ['text', 'json'] }))
app.use(async (ctx, next) => {
  logger.log(`${ctx.method} ${ctx.url} from ${ctx.ip}`)
  if (typeof ctx.request.body !== 'undefined') {
    if (typeof ctx.request.body.key !== 'undefined') {
      const aesKey = key.decrypt(ctx.request.body.key, 'utf8')
      ctx.request.key = aesKey
      ctx.request.data = JSON.parse(
        aes256.decrypt(aesKey, ctx.request.body.data)
      )
    }
  }
  ctx.conn = connection
  ctx.logger = logger
  await next()
})

app.on('error', (err) => {
  logger.error(err)
})

router.get('/rsa/public', (ctx) => {
  ctx.body = { key: key.exportKey('pkcs8-public') }
})

router.use(apiRouter.routes(), apiRouter.allowedMethods())
router.use(userRouter.routes(), userRouter.allowedMethods())

app.use(router.routes()).use(router.allowedMethods())

app.listen(4567, () => {
  logger.start('The server is started!')
})
