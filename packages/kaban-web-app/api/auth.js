import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import jwt from 'express-jwt'
import jsonwebtoken from 'jsonwebtoken'

const app = express()

app.use(cookieParser())
app.use(bodyParser.json())

app.use(
	jwt({
		secret: 'dummy'
	}).unless({
		path: '/api/auth/login'
	})
)

app.post('/login', (req, res, next) => {
	const { username, password } = req.body
	const valid = username.length && password === '123'

	if (!valid) {
		throw new Error('Invalid username or password')
	}

	const accessToken = jsonwebtoken.sign(
		{
			username,
			picture: 'https://github.com/nuxt.png',
			name: 'User ' + username,
			scope: ['test', 'user']
		},
		'dummy'
	)

	res.json({
		token: {
			accessToken
		}
	})
})

app.get('/user', (req, res, next) => {
	res.json({ user: req.user })
})

app.post('/logout', (req, res, next) => {
	res.json({ status: 'OK' })
})


app.use((err, req, res, next) => {
	console.error(err)
	res.status(401).send(err + '')
})

export default {
	path: '/api/auth',
	handler: app
}
