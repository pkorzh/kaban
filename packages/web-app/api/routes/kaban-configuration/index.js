import { Router } from 'express';

import jwtPerm from 'express-jwt-permissions'

import { kabanConfiguration } from '../../dal';

import s3Routes from './s3';
import telegramRoutes from './telegram';

const guard = jwtPerm();
const router = Router();

router.get('/kaban-configuration', guard.check('admin'), async function (req, res, next) {	
	const status = await kabanConfiguration.status();
	return res.json(status);
});

router.patch('/kaban-configuration', guard.check('admin'), async function (req, res, next) {	
	await kabanConfiguration.patchConfig(req.body.delta ? req.body.delta : req.body);
	return res.json();
});

router.use('/kaban-configuration/storage/s3', s3Routes);

router.use('/kaban-configuration/notification/telegram', telegramRoutes);

export default router;
