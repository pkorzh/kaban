import { Router } from 'express';

import jwtPerm from 'express-jwt-permissions'

import { kabanConfiguration } from '../../dal';
import { S3Storage } from '../../storage';

const guard = jwtPerm();
const router = Router();

router.post('/list-buckets', guard.check('admin'), async function (req, res, next) {	
	const storage = new S3Storage(req.body);

	return res.json(await storage.listBuckets());
});

router.post('/upload-sample', guard.check('admin'), async function (req, res, next) {	
	const storage = new S3Storage(req.body);

	return res.json(await storage.upload({
		key: 'kaban-test-file-safe-to-delete.txt',
		buffer: Buffer.from('safe-to-delete')
	}));
});

router.post('/save-configuration', guard.check('admin'), async function (req, res, next) {	
	await kabanConfiguration.storageConfig({ ...req.body, type: 's3' });
	return res.json();
});

export default router;