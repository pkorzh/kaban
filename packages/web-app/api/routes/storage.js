import { Router } from 'express'

import { kabanConfiguration as kabanConf } from '../dal'
import Storage from '../storage';

const router = Router()

router.post('/storage/preprocess', async function (req, res, next) {
	const config = await kabanConf.storageConfig();
	const storage = Storage.from(config);

	res.json(await Promise.resolve(storage.preprocess(req.body)));
})


export default router