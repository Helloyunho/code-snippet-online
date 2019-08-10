const Router = require('koa-router')
const aes256 = require('aes256')
const rethinkdb = require('rethinkdb')
const router = new Router()

router.post('/login', async (ctx) => {
  try {
    const { email, password } = ctx.request.data
    const cursor = await rethinkdb
      .db('cso')
      .table('users')
      .filter({ email, password })
      .run(ctx.conn)
    const user = await cursor.toArray()

    if (user.length !== 1) {
      ctx.body = aes256.encrypt(
        ctx.request.key,
        JSON.stringify({
          success: false,
          code: 1
        })
      )
    } else {
      ctx.body = aes256.encrypt(
        ctx.request.key,
        JSON.stringify({
          success: true
        })
      )
    }
  } catch (err) {
    if (err) {
      ctx.body = aes256.encrypt(
        ctx.request.key,
        JSON.stringify({
          success: false
        })
      )
      ctx.logger.error(err)
    }
  }
})

module.exports = router
