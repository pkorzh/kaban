const { Router } = require('express')

const router = Router()

const { boards: boardsDal } = require('../dal')
const { notifySubscribers } = require('./sse_clients')

router.get('/boards', async function (req, res, next) {
	const boards = await boardsDal.query(req.query.tql)
	return res.json(boards)
})

router.post('/boards', async function (req, res, next) {
	const boardSlim = req.body

	const board = await boardsDal.insert(boardSlim)

	notifySubscribers('createBoard', board)

	return res.json(board)
})

router.patch('/boards/:key', async function (req, res, next) {
	const boardDelta = req.body

	const board = await boardsDal.patch(
		req.params.key,
		boardDelta
	)

	notifySubscribers('updateBoard', board)

	return res.json(board)
})

module.exports = router
