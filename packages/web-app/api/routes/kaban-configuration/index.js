import { Router } from 'express';

import jwtPerm from 'express-jwt-permissions'

import { kabanConfiguration } from '../../dal';

import s3Routes from './s3';

const guard = jwtPerm();
const router = Router();

router.get('/kaban-configuration', guard.check('admin'), async function (req, res, next) {	
	const status = await kabanConfiguration.status();
	return res.json(status);
});

router.use('/kaban-configuration/storage/s3', s3Routes);

export default router;