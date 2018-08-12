const { Router } = require('express')

const router = Router()

const shortid = require('shortid')

const { notifySubscribers } = require('./sse_clients')
const { backlogs: backlogsDal } = require('../dal')

router.get('/backlogs', async function (req, res, next) {
	const backlogs = await backlogsDal.query()

	return res.json(backlogs)
})

router.post('/backlogs', async function (req, res, next) {
	const backlogSlim = req.body

	const { backlog, board } = await backlogsDal.insert(backlogSlim)

	notifySubscribers('createBacklog', backlog)
	notifySubscribers('createBoard', board)

	return res.json(backlog)
})

router.get('/backlogs/:key', async function (req, res, next) {
	const backlog = await backlogsDal.get({key: req.params.key})
	return res.json(backlog)
})

module.exports = router
