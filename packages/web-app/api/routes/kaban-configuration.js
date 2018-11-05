import { Router } from 'express';

import jwtPerm from 'express-jwt-permissions'

import { kabanConfiguration } from '../dal';
import { S3Storage } from '../storage';

const guard = jwtPerm();
const router = Router();

router.get('/kaban-configuration', guard.check('admin'), async function (req, res, next) {	
	const status = await kabanConfiguration.status();
	return res.json(status);
});

router.post('/kaban-configuration/storage/s3/list-buckets', guard.check('admin'), async function (req, res, next) {	
	const storage = new S3Storage(req.body);

	return res.json(await storage.listBuckets());
});

router.post('/kaban-configuration/storage/s3/upload-sample', guard.check('admin'), async function (req, res, next) {	
	const storage = new S3Storage(req.body);

	return res.json(await storage.upload({
		key: 'kaban-test-file-safe-to-delete.txt',
		buffer: Buffer.from('safe-to-delete')
	}));
});

router.post('/kaban-configuration/storage/s3/save-configuration', guard.check('admin'), async function (req, res, next) {	
	await kabanConfiguration.storageConfig({ ...req.body, type: 's3' });
	return res.json();
});

export default router;