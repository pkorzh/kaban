const { Router } = require('express')

const router = Router()

const { boards: boardsDal } = require('../dal')

router.get('/boards', async function (req, res, next) {
	const boards = await boardsDal.query()
	return res.json(boards)
})

router.get('/boards/:key', async function (req, res, next) {
	const board = await boardsDal.get({key: req.params.key})
	return res.json(board)
})

module.exports = router
