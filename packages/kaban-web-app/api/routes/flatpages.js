import { Router } from 'express'
import shortid from 'shortid'

import { flatpages as flatpagesDal } from '../dal'

const router = Router()

router.get('/flatpages', async function (req, res, next) {
	const flatpages = await flatpagesDal.query(req.query.tql)

	return res.json(flatpages)
})

router.post('/flatpages', async function (req, res, next) {
	const flatpageSlim = req.body

	if (!flatpageSlim.key) {
		flatpageSlim.key = shortid.generate()
	}

	const flatpage = await flatpagesDal.insert(flatpageSlim)
	return res.json(flatpage)
})

router.get('/flatpages/content/:key', async function (req, res, next) {
	const content = await flatpagesDal.content(req.params.key)
	return res.json(content)
})

router.patch('/flatpages/:key', async function (req, res, next) {
	const flatpageDelta = req.body

	const flatpage = await flatpagesDal.patch(
		req.params.key,
		flatpageDelta
	)

	return res.json(flatpage)
})

export default router
