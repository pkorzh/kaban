import express from 'express'

import users from './routes/users'
import tickets from './routes/tickets'
import boards from './routes/boards'
import backlogs from './routes/backlogs'
import ping from './routes/ping'
import sse from './routes/sse'
import workflow from './routes/workflow'
import flatpages from './routes/flatpages'

const app = express()

app.use(users)
app.use(tickets)
app.use(boards)
app.use(backlogs)
app.use(ping)
app.use(sse)
app.use(workflow)
app.use(flatpages)

export default {
  path: '/api',
  handler: app
}
