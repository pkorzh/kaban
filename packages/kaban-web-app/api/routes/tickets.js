const { Router } = require('express')

const router = Router()

const shortid = require('shortid')

const { notifySubscribers } = require('./sse_clients')
const {
	tickets: ticketsDal,
	workflow: workflowDal,
} = require('../dal')

router.get('/tickets', async function (req, res, next) {
	const tickets = await ticketsDal.query(req.query.tql, req.query.limit)

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

module.exports = router
