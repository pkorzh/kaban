import 'express-async-errors'

import express from 'express'
import jwt from 'express-jwt'

import users from './routes/users'
import tickets from './routes/tickets'
import boards from './routes/boards'
import backlogs from './routes/backlogs'
import ping from './routes/ping'
import sse from './routes/sse'
import workflow from './routes/workflow'
import flatpages from './routes/flatpages'

import comments from './routes/comments'
import history from './routes/history'
import rank from './routes/rank'

import {authErrorHandler, errorHandler, dbErrorHandler} from './error-handlers'

const app = express()

app.set('secret', 'dfjbakjgsfd238irgfa')

app.use(
	jwt({
			secret: app.get('secret')
		}
	).unless({
		path: [
			'/api/users/login',
			'/api/sse'
		]
	})
)

app.use(users)
app.use(tickets)
app.use(boards)
app.use(backlogs)
app.use(ping)
app.use(sse)
app.use(workflow)
app.use(flatpages)
app.use(comments)
app.use(history)
app.use(rank)

app.use(authErrorHandler)
app.use(dbErrorHandler)
app.use(errorHandler)

export default {
  path: '/api',
  handler: app
}
