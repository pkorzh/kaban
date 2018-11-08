import { Router } from 'express'
import getnewid from '../newid'

import { notifySubscribers } from './sse_clients'
import { tickets as ticketsDal } from '../dal'

const router = Router()

router.get('/attachments', async function (req, res, next) {
	return res.json(await ticketsDal.attachments.query(req.query.tql))
})

router.post('/attachments', async function (req, res, next) {
	const commentSlim = Object.assign(req.body, {
		key: getnewid(),
		user: req.user,
	})

	const comment = await ticketsDal.attachments.insert(commentSlim)

	notifySubscribers('createAttachment', comment)

	return res.json(comment)
})

router.delete('/attachments/:key', async function (req, res, next) {
	await ticketsDal.attachments.remove(req.params.key)
	notifySubscribers('deleteAttachment', req.params.key)
	return res.sendStatus(200)
})

export default router
