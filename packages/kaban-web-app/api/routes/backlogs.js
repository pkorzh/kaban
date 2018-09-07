const { Router } = require('express')

const router = Router()

const shortid = require('shortid')

const { notifySubscribers } = require('./sse_clients')
const {
	backlogs: backlogsDal,
	tickets: ticketsDal
} = require('../dal')

router.get('/backlogs', async function (req, res, next) {
	const backlogs = await backlogsDal.query(req.query.tql)

	let newbacklogs = []

	for (var i = backlogs.length - 1; i >= 0; i--) {
		const b = backlogs[i].toJSON()

		const totalTickets = await ticketsDal.count(`backlog = ${b.key}`)
		const closedTickets = await ticketsDal.count(`backlog = ${b.key} and status = closed`)

		newbacklogs.push({
			...b,
			progress: Math.floor(closedTickets * 100 / totalTickets),
		})
	}

	return res.json(newbacklogs)
})

router.post('/backlogs', async function (req, res, next) {
	const backlogSlim = req.body

	const backlog = await backlogsDal.insert(backlogSlim)

	notifySubscribers('createBacklog', backlog)

	return res.json(backlog)
})

router.patch('/backlogs/:key', async function (req, res, next) {
	const backlogDelta = req.body

	const backlog = await backlogsDal .patch(
		req.params.key,
		backlogDelta
	)

	notifySubscribers('updateBacklog', backlog)

	return res.json(backlog)
})

module.exports = router
