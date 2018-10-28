import { Router } from 'express'

import { clients } from './sse_clients'

const router = Router()

router.get('/sse', function (req, res, next) {
	req.socket.setTimeout(Number.MAX_VALUE);

	res.set({
		'Content-Type': 'text/event-stream',
		'Cache-Control': 'no-cache',
		'Connection': 'keep-alive'
	});

	clients.push(res)

	req.on('close', function () {
		clients.splice(clients.indexOf(res))
		console.log('Deleting SSE listener, left ', clients.length)
	})
})

export default router
