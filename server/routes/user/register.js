const Router = require('koa-router')
const aes256 = require('aes256')
const rethinkdb = require('rethinkdb')
const router = new Router()

router.post('/register', async (ctx) => {
  try {
    const { email, password, username } = ctx.request.data

    const emailCursor = await rethinkdb
      .db('cso')
      .table('users')
      .filter({ email })
      .run(ctx.conn)
    const emailUser = await emailCursor.toArray()
    const usernameCursor = await rethinkdb
      .db('cso')
      .table('users')
      .filter({ username })
      .run(ctx.conn)
    const usernameUser = await usernameCursor.toArray()
    if (emailUser.length !== 0 || usernameUser.length !== 0) {
      ctx.body = aes256.encrypt(
        ctx.request.key,
        JSON.stringify({
          success: false,
          code: 1
        })
      )
      return
    }

    const idCursor = await rethinkdb
      .db('cso')
      .table('users')
      .orderBy('uid')
      .run(ctx.conn)
    const lastID = (await idCursor.toArray())[0]

    await rethinkdb
      .db('cso')
      .table('users')
      .insert({
        email,
        password,
        username,
        level: 0,
        permission: 0,
        uid: lastID.uid + 1
      })
      .run(ctx.conn)

    ctx.body = aes256.encrypt(
      ctx.request.key,
      JSON.stringify({
        success: true
      })
    )
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
