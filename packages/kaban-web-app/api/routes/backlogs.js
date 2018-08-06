const { Router } = require('express')

const router = Router()

const backlogs = [
	{
		id: 1,
		name: 'Create ☁️ AWS API',
		key: 'create-aws-api',
	},
	{
		id: 2,
		name: 'Native Feed & Profile',
		key: 'native-feed-profile',
	}
]

router.get('/backlogs', function (req, res, next) {
	res.json(backlogs)
})

router.get('/backlogs/:key', function (req, res, next) {
	res.json(backlogs.find(b => b.key === req.params.key))
})

module.exports = router
