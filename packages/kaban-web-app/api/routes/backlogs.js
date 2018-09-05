const { Router } = require('express')

const router = Router()

const shortid = require('shortid')

const { notifySubscribers } = require('./sse_clients')
const { backlogs: backlogsDal } = require('../dal')

router.get('/backlogs', async function (req, res, next) {
	const backlogs = await backlogsDal.query(req.query.tql)

	return res.json(backlogs)
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
