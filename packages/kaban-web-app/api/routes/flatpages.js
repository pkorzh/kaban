const { Router } = require('express')

const router = Router()

const shortid = require('shortid')

const { flatpages: flatpagesDal } = require('../dal')

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

module.exports = router
