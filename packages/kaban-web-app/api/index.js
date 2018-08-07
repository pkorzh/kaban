const express = require('express')

const app = express()

app.use(require('./routes/users'))
app.use(require('./routes/tickets'))
app.use(require('./routes/boards'))
app.use(require('./routes/backlogs'))

module.exports = {
  path: '/api',
  handler: app
}