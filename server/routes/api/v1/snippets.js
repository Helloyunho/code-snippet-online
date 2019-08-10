const Router = require('koa-router')
const rethinkdb = require('rethinkdb')
const router = new Router()

router.get('/snippets', async (ctx) => {
  const cursor = await rethinkdb
    .db('cso')
    .table('snippets')
    .run(ctx.conn)

  const authorCursor = await rethinkdb
    .db('cso')
    .table('users')
    .run(ctx.conn)

  const snippets = await cursor.toArray()
  const authors = await authorCursor.toArray()

  ctx.body = JSON.stringify(
    await Promise.all(
      snippets.map(async ({ title, description, sid, author, thumbnail }) => {
        const result = {
          title,
          desc: description,
          sid,
          thumbnail
        }
        const { email, uid, level, permission, username } = authors.find(
          (a) => a.uid === author
        )
        result.author = {
          email,
          uid,
          level,
          permission,
          username
        }

        return result
      })
    ),
    null,
    2
  )
  ctx.response.type = 'json'
})

router.get('/snippets/:id', async (ctx) => {
  const cursor = await rethinkdb
    .db('cso')
    .table('snippets')
    .filter({ sid: parseInt(ctx.params.id) })
    .run(ctx.conn)

  const {
    title,
    description,
    sid,
    author,
    thumbnail,
    content,
    lang,
    code
  } = (await cursor.toArray())[0]
  const result = {
    title,
    desc: description,
    sid,
    thumbnail,
    content,
    lang,
    code
  }
  console.log(await cursor.toArray())
  const authorCursor = await rethinkdb
    .db('cso')
    .table('users')
    .filter({ uid: author })
    .run(ctx.conn)
  const {
    email,
    uid,
    level,
    permission,
    username
  } = (await authorCursor.toArray())[0]
  result.author = {
    email,
    uid,
    level,
    permission,
    username
  }

  ctx.body = JSON.stringify(result, null, 2)
  ctx.response.type = 'json'
})

module.exports = router
