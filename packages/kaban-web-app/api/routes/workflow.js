const { Router } = require('express')

const { notifySubscribers } = require('./sse_clients')
const { workflow: workflowDal } = require('../dal')

const router = Router()

router.post('/workflow/transition', async function(req, res, next) {
	const keys = req.body.keys || []
	const mapsTo = req.body.mapsTo || {}

	try {
		await workflowDal.transition(keys, mapsTo)
	} catch(e) {
		return next(e)
	}

	notifySubscribers('workflowTransition', {})

	return res.json({})
})

router.get('/workflow/status', async function(req, res, next) {

})

module.exports = router
