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

app.use(function (err, req, res, next) {
	if (err.code === 'permission_denied') {
		res.status(403).send(err.message);
	}

	if (err.name === 'UnauthorizedError') {
		res.status(401).send(err.message)
	}
})

export default {
  path: '/api',
  handler: app
}
