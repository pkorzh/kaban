import { Router } from 'express'
import getnewid from '../newid'

import { boards as boardsDal } from '../dal'
import broadcast from './../broadcast'

const router = Router()

router.get('/boards', async function (req, res, next) {
	const boards = await boardsDal.query(req.query.tql)
	return res.json(boards)
})

router.post('/boards', async function (req, res, next) {
	const boardSlim = req.body

	const board = await boardsDal.insert(boardSlim)

	await broadcast('createBoard', board)

	return res.json(board)
})

router.delete('/boards/:key', async function (req, res, next) {
	await boardsDal.remove(req.params.key)

	await broadcast('deleteBoard', req.params.key)

	return res.sendStatus(200)
})

router.patch('/boards/:key', async function (req, res, next) {
	const boardDelta = req.body

	const board = await boardsDal.patch(
		req.params.key,
		boardDelta
	)

	await broadcast('updateBoard', board)

	return res.json(board)
})

router.get('/card-color', async function (req, res, next) {
	const cm = await boardsDal.cardColor.query(req.query.tql)
	return res.json(cm)
})

router.post('/card-color', async function (req, res, next) {
	const cardColorSlim = req.body

	if (!cardColorSlim.key) {
		cardColorSlim.key = getnewid()
	}

	const cm = await boardsDal.cardColor.insert(cardColorSlim)
	return res.json(cm)
})

router.patch('/card-color/:key', async function (req, res, next) {
	const cardColorDelta = req.body

	const cm = await boardsDal.cardColor.patch(
		req.params.key,
		cardColorDelta
	)

	return res.json(cm)
})

export default router
