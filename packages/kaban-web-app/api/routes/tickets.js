const { Router } = require('express')

const router = Router()

const issues = require('../../../kaban-importer-jira/issues.json')

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
	console.log(req.body.data)
	res.json(req.body.data)
})

router.get('/tickets/:key', function (req, res, next) {
	res.json(issues.find(ticket => ticket.key === req.params.key))
})

module.exports = router
