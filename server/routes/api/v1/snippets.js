const Router = require('koa-router')
const rethinkdb = require('rethinkdb')
const router = new Router()

router.get('/snippets', async (ctx) => {
  await new Promise((resolve, reject) => {
    rethinkdb
      .db('cso')
      .table('snippets')
      .run(ctx.conn, (err, cursor) => {
        if (err) throw err
        cursor.toArray((err, result) => {
          if (err) throw err
          ctx.body = JSON.stringify(
            result.map(({ title, description, id, author }) => {
              return {
                title,
                desc: description,
                id,
                author
              }
            }),
            null,
            2
          )
          ctx.response.type = 'json'
          resolve()
        })
      })
  })
})

module.exports = router
