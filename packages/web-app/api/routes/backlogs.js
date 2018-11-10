import { Router } from 'express'

import broadcast from './../broadcast'

import {
	backlogs as backlogsDal,
	tickets as ticketsDal
} from '../dal'

const router = Router()

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

	broadcast('createBacklog', backlog)

	return res.json(backlog)
})

router.patch('/backlogs/:key', async function (req, res, next) {
	const backlogDelta = req.body

	const backlog = await backlogsDal.patch(
		req.params.key,
		backlogDelta
	)

	broadcast('updateBacklog', backlog)

	return res.json(backlog)
})

router.delete('/backlogs/:key', async function (req, res, next) {
	if (req.query.migrateTo) {
		await backlogsDal.removeAndMigrate(req.params.key, req.query.migrateTo)
	} else {
		await backlogsDal.remove(req.params.key)
	}

	broadcast('deleteBacklog', req.params.key)

	return res.sendStatus(200)
})

router.get('/backlogs/:key/forecast', async function (req, res, next) {
	const forecast = await backlogsDal.forecast(req.params.key)
	return res.json(forecast)
})

export default router
