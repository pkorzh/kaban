import { Router } from 'express'

import { notifySubscribers } from './sse_clients'
import {
	workflow as workflowDal,
	tickets as ticketsDal
} from '../dal'

const router = Router()

router.get('/workflow/transition', function(req, res, next) {
	return res.json(workflowDal.transitions())
})

router.get('/workflow/status', function(req, res, next) {
	return res.json(workflowDal.status())
})

router.post('/workflow/transition', async function(req, res, next) {
	const keys = req.body.keys || []
	const mapsTo = req.body.mapsTo || {}

	try {
		for (var i = 0; i < keys.length; i++) {
			const key = keys[i]

			let ticket = await ticketsDal.get(`key = ${key}`)

			const from = ticket.status
			const to = {key: mapsTo}

			if (workflowDal.hasTransition(from, to)) {
				await ticketsDal.patch(key, {
					status: workflowDal.status(to),
					lastTransitionAt: new Date(),
				})

				await workflowDal.transition(ticket, to)
			} else {
				throw new WorkflowTransitionError({
					key,
					from,
					to,
				})
			}
		}
	} catch(e) {
		return next(e)
	}

	notifySubscribers('workflowTransition', {})

	return res.json({})
})

export default router

