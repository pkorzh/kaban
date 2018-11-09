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

	const text = req.body.message.text;
	const chatId = req.body.message.chat.id;
	const chatTitle = req.body.message.chat.title;

	const t = new Telegram({ ...kc.notification, chatId: chatId  });

	if (/\/start/.test(text)) {
		await t.sendMessage(`
*Welcome to Kaban bot*
Hit [/register](/register) to receive notifications
		`);
	} else if (/\/register/.test(text)) {
		await kabanConfiguration.patchConfig({'notification.chatId': chatId});

		await t.sendMessage(`
Registered *${chatTitle}* as notification target
		`);
	}

	return res.json({});
});

export default router;