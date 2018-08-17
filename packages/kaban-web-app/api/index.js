const express = require('express')

const app = express()

app.use(require('./routes/users'))
app.use(require('./routes/tickets'))
app.use(require('./routes/boards'))
app.use(require('./routes/backlogs'))
app.use(require('./routes/ping'))
app.use(require('./routes/sse'))
app.use(require('./routes/workflow'))

module.exports = {
  path: '/api',
  handler: app
}
