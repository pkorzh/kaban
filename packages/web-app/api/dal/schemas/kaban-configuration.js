const { Schema } = require('mongoose');

import KeySchema from './key';

const schema = new Schema({
	storage: {
		type: {}
	},
}, {
	timestamps: true,
	strict: true,
});

schema.statics._get = async function _getKabanConfiguration() {
	const existingOne = await this.findOne().sort({ updatedAt: -1 });

	if (existingOne) {
		return existingOne;
	}

	const newOne = new this({
		storage: {
			type: null,
		}
	});

	await newOne.save()
	return newOne;
}

schema.statics.status = async function _status() {
	const kc = await this._get();

	return {
		storageStatus: kc.storage.type,
	};
}

schema.statics.storageConfig = async function _storageConfig(storage) {
	const kc = await this._get();

	if (arguments.length) {
		kc.storage = storage;
		return await kc.save();
	}

	return kc.storage;
}

export default schema;