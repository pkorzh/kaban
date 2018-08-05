const express = require('express')

const users = require('./routes/users')

const app = express()
app.use(users)

module.exports = {
  path: '/api',
  handler: app
}
