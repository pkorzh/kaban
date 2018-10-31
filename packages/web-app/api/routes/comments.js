import { Router } from 'express'
import getnewid from '../newid'

import { notifySubscribers } from './sse_clients'
import { tickets as ticketsDal } from '../dal'

const router = Router()

router.get('/comments', async function (req, res, next) {
	return res.json(await ticketsDal.comments.query(req.query.tql))
})

router.post('/comments', async function (req, res, next) {
	const commentSlim = Object.assign(req.body, {
		key: getnewid(),
		author: {
			key: req.user.key
		}
	})

	const comment = await ticketsDal.comments.insert(commentSlim)

	notifySubscribers('createComment', comment)

	return res.json(comment)
})

router.delete('/comments/:key', async function (req, res, next) {
	await ticketsDal.comments.remove(req.params.key)
	notifySubscribers('deleteComment', req.params.key)
	return res.sendStatus(200)
})

export default router

