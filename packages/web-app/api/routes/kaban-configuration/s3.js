import { Router } from 'express';

import jwtPerm from 'express-jwt-permissions'

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

export default router;