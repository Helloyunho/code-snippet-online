const Router = require('koa-router')
const aes256 = require('aes256')
const rethinkdb = require('rethinkdb')
const router = new Router()

router.get('/register', async (ctx) => {
  try {
    const { email, password, username } = ctx.request.data
    const cursor = await rethinkdb
      .db('cso')
      .table('users')
      .orderBy({ index: 'uid' })
      .run(ctx.conn)
    const lastID = (await cursor.toArray())[0]

    rethinkdb
      .db('cso')
      .table('users')
      .insert({
        email,
        password,
        username,
        level: 0,
        permission: 0,
        uid: lastID + 1
      })
      .run(ctx.conn)

    ctx.body = JSON.stringify({
      success: true
    })
    ctx.type = 'json'
  } catch (err) {
    if (err) {
      ctx.body = JSON.stringify({
        success: false
      })
      ctx.type = 'json'
      ctx.logger.error(err)
    }
  }
})

module.exports = router
