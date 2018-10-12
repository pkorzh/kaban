import {Router} from 'express'
import util from 'util'
import {users as usersDal} from '../dal'
import {notifySubscribers} from './sse_clients'
import jsonwebtoken from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import shortid from 'shortid'
import jwtPerm from 'express-jwt-permissions'
import {UnauthorizedError} from 'express-jwt'

const guard = jwtPerm()
const compare = util.promisify(bcrypt.compare)
const router = Router()

router.get('/users', async function (req, res, next) {
	const users = await usersDal.query(req.query.tql)

	return res.json(users)
})

router.post('/users', guard.check('admin'), async function (req, res, next) {
	const userSlim = req.body

	if (!userSlim.key) {
		userSlim.key = shortid.generate()
	}

	const user = await usersDal.insert(userSlim)

	notifySubscribers('createUser', user)

	return res.json(user)
})

router.patch('/users/:key', guard.check('admin'), async function (req, res, next) {
	const userDelta = req.body

	const user = await usersDal.patch(
		req.params.key,
		userDelta,
	)

	notifySubscribers('updateUser', user)

	return res.json(user)
})

router.delete('/users/:key', guard.check('admin'), async function (req, res, next) {
	await usersDal.remove(req.params.key)

	notifySubscribers('deleteUser', req.params.key)

	return res.sendStatus(200)
})

router.post('/users/login', async function (req, res, next) {
	const {email, password} = req.body

	// tql update needed
	const user = await usersDal.get({
		email: {
			$eq: email,
		},
	})

	if (!user) {
		throw UnauthorizedError('login_error', {
			message: 'No user found'
		})
	}

	const valid = await compare(password, user.password)

	if (valid) {
		const token = jsonwebtoken.sign({
				key: user.key,
				permissions: user.permissions
			},
			req.app.get('secret'),
			{expiresIn: '24h'})

		res.json({token})
	} else {
		throw UnauthorizedError('login_error', {
			message: 'Wrong password'
		})
	}
})

router.post('/users/logout', (req, res, next) => {
	res.json({status: 'OK'})
})

router.get('/users/me', async (req, res, next) => {
	const user = await usersDal.get({key: {$eq: req.user.key}})

	res.json({user})
})


export default router
