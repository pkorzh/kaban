import { Router } from 'express'

import { tickets as ticketsDal } from '../dal'

const router = Router()

router.post('/rank', async function (req, res, next) {
	return res.json(await ticketsDal.rank.rank(req.body))
})

export default router

