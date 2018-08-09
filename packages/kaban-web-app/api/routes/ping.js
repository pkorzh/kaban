const { Router } = require('express')

const router = Router()

router.get('/ping', function (req, res, next) {
	res.status(200).send('pong')
})


module.exports = router
