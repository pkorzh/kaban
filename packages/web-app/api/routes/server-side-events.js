import { Router } from 'express'

import { default as redisClientFactory } from '../redis';

const router = Router()

router.get('/sse', function (req, res, next) {
	req.socket.setTimeout(Number.MAX_VALUE);

	res.writeHead(200, {
		'Content-Type': 'text/event-stream',
		'Cache-Control': 'no-cache',
		'Connection': 'keep-alive',
		'X-Accel-Buffering': 'no',
		'Content-Encoding': 'identity',
		'Accept-Encoding': 'identity',
	});

	res.flush();

	const sub = redisClientFactory();

	console.log('server-side-events');

	sub.on('message', (channel, message) => {
		res.write(`data: ${message}\n\n`);
	});

	sub.subscribe('server-side-events');

	req.on('close', () => {
		sub.unsubscribe('server-side-events');
		res.end();
	});

	return res;
});

export default router