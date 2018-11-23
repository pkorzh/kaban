import { Router } from 'express'

import { default as redisClientFactory } from '../redis';

const router = Router()

router.get('/server-side-events', function (req, res, next) {
	req.socket.setTimeout(Number.MAX_VALUE);

	res.writeHead(200, {
		'content-type': 'text/event-stream',
		'cache-control': 'no-cache',
		'connection': 'keep-alive',
	});

	res.write('\n');

	const sub = redisClientFactory();

	sub.on('message', (channel, message) => {
		res.write(`data: ${message}\n\n`);
	});

	sub.subscribe('server-side-events');

	req.on('close', () => {
		sub.unsubscribe('server-side-events');
		res.end();
	});
});

export default router