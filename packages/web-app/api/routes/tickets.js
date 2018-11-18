import { Router } from 'express'
import getnewid from '../newid'

import broadcast from './../broadcast'
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
	const ticketSlim = req.body;

	if (!ticketSlim.key) {
		ticketSlim.key = getnewid();
	}

	const ticket = await ticketsDal.insert({
		...ticketSlim,
		rank: await ticketsDal.rank.next(),
		lastTransitionAt: new Date()
	})

	await workflowDal.zeroTransition(ticket);

	broadcast('createTicket', ticket);

	return res.json(ticket);
})

router.post('/tickets/move', async function (req, res, next) {
	await ticketsDal.move(req.body);
	return res.json();
})

router.patch('/tickets/:key', async function (req, res, next) {
	const ticketDelta = req.body

	const ticket = await ticketsDal.patch(
		req.params.key,
		ticketDelta,
		req.user,
	)

	broadcast('patchTicket', ticket)

	return res.json(ticket)
})

router.delete('/tickets/:key', async function (req, res, next) {
	await ticketsDal.remove(req.params.key)

	broadcast('deleteTicket', req.params.key)

	return res.sendStatus(200)
})

export default router

