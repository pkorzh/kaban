import { Router } from 'express'
import getnewid from '../newid'

import { notifySubscribers } from './sse_clients'
import {
	tickets as ticketsDal,
	workflow as workflowDal,
} from '../dal'

const router = Router()

router.get('/tickets', async function (req, res, next) {
	const tickets = await ticketsDal.query(req.query.tql, req.query.limit, {
		board: req.query.board,
		user: req.user,
	})

	return res.json(tickets);
})

router.post('/tickets', async function (req, res, next) {
	const ticketSlim = req.body

	if (!ticketSlim.key) {
		ticketSlim.key = getnewid()
	}

	const ticket = await ticketsDal.insert({
		...ticketSlim,
		rank: await ticketsDal.rank.next(),
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
		ticketDelta,
		req.user,
	)

	notifySubscribers('updateTicket', ticket)

	return res.json(ticket)
})

router.post('/rank', async function (req, res, next) {
	return res.json(await ticketsDal.rank.rank(req.body))
})

export default router

