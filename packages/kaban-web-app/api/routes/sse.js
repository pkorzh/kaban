const { Router } = require('express')

const router = Router()

const { clients } = require('./sse_clients')

router.get('/sse', function (req, res, next) {
	req.socket.setTimeout(Number.MAX_VALUE);

	res.set({
		'Content-Type': 'text/event-stream',
		'Cache-Control': 'no-cache',
		'Connection': 'keep-alive'
	});

	clients.push(res)

	req.on('close', function () {
		console.log('Deleting SSE listener, left ', clients.length)
		clients.splice(clients.indexOf(res))
	})
})

module.exports = router
