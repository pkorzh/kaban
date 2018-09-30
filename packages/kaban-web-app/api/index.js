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
		secret: app.get('secret'),
		getToken: (req) => {
			if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
				return req.headers.authorization.split(' ')[1];
			} else if (req.query && req.query.token) {
				return req.query.token;
			}

			console.log('auth error on route', req.url)

			return null;
		}
	}).unless({
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
	if (err.name === 'UnauthorizedError') {
		res.status(401).send('invalid token...')
	}
})

export default {
  path: '/api',
  handler: app
}
