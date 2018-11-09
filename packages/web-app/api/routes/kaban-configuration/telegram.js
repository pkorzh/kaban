import { Router } from 'express';

import jwtPerm from 'express-jwt-permissions'

import { kabanConfiguration } from '../../dal';
import { Telegram } from '../../notification';

const guard = jwtPerm();
const router = Router();

router.post('/check-token', guard.check('admin'), async function (req, res, next) {	
	const t = new Telegram(req.body);

	return res.json(await t.checkToken());
});

router.post('/handle-webhook', async function(req, res, next) {
	const secret = req.query.secret;
	const kc = await kabanConfiguration.get();

	if (secret !== kc.notification.token) {
		throw new Error('Wrong secret');
	}

	const chatId = req.body.message.chat.id;
	await kabanConfiguration.patchConfig({'notification.chatId': chatId})
	return res.json({});
});

export default router;