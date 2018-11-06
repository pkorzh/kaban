import { Router } from 'express'

import { tickets as ticketsDal } from '../dal'

const router = Router()

router.get('/history', async function (req, res, next) {
	return res.json(await ticketsDal.history.query(req.query.tql))
})

export default router

