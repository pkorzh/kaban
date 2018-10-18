import { Router } from 'express'
import shortid from 'shortid'

import { notifySubscribers } from './sse_clients'
import {
	tickets as ticketsDal,
	workflow as workflowDal,
} from '../dal'

const router = Router()

router.get('/tickets', async function (req, res, next) {
	const tickets = await ticketsDal.query(req.query.tql, req.query.limit, {
		board: req.query.board
	})

	return res.json(tickets)
})

router.post('/tickets', async function (req, res, next) {
	const ticketSlim = req.body

	if (!ticketSlim.key) {
		ticketSlim.key = shortid.generate()
	}

	const ticket = await ticketsDal.insert({
		...ticketSlim,
		lastTransitionAt: new Date()
	})

	await workflowDal.zeroTransition(ticket)

	notifySubscribers('createTicket', ticket)

	return res.json(ticket)
})

router.patch('/tickets/:key', async function (req, res, next) {
	const ticketDelta = req.body

	const ticket = await ticketsDal.patch(
		req.params.key,
		ticketDelta
	)

	notifySubscribers('updateTicket', ticket)

	return res.json(ticket)
})

router.get('/comments', async function (req, res, next) {
	return res.json(await ticketsDal.comments.query(req.query.tql))
})

router.post('/comments', async function (req, res, next) {
	const commentSlim = Object.assign(req.body, {
		key: shortid.generate(),
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

