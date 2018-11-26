import { Router } from 'express'

import broadcast from './../broadcast'
import {
	workflow as workflowDal,
	tickets as ticketsDal
} from '../dal'

function WorkflowTransitionError({key, from, to}) {
	this.name = 'WorkflowTransitionError';
	this.message = `Can't transition from ${from.key} to ${to.key}`;
	this.from = from;
	this.to = to;
}
WorkflowTransitionError.prototype = new Error;

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
				}, req.user);

				await broadcast('workflowTransition', {
					ticket,
					from,
					to
				});

				await workflowDal.transition(ticket, to);
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

	return res.json({})
})

export default router

