const { Router } = require('express')

const router = Router()

const issues = require('../../issues.json')
const { notifySubscribers } = require('./sse_clients')

router.get('/tickets', function (req, res, next) {
	if (req.query.backlog) {
		res.json(issues.filter(ticket => {
			return ticket.backlog.key == req.query.backlog
		}))
	} else {
		res.json(issues)
	}
})

router.post('/tickets', function (req, res, next) {
	notifySubscribers('createTicket', req.body)
	res.json(req.body)
})

router.get('/tickets/:key', function (req, res, next) {
	res.json(issues.find(ticket => ticket.key === req.params.key))
})

module.exports = router
