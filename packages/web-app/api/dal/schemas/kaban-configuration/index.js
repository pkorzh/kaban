const { Schema } = require('mongoose');

import GeneralSchema from './general';

const schema = new Schema({
	storage: {
		type: {}
	},
	notification: {
		type: {}
	},
	general: GeneralSchema,
}, {
	timestamps: true,
	strict: true,
});

schema.statics.get = async function _getKabanConfiguration() {
	const existingOne = await this.findOne().sort({ updatedAt: -1 });

	if (existingOne) {
		return existingOne;
	}

	const newOne = new this({
		storage: {
			type: null,
		},
		notification: {
			type: null,
		},
		general: {
		}
	});

	await newOne.save()
	return newOne;
}

schema.statics.status = async function _status() {
	const kc = await this.get();

	return {
		storageStatus: kc.storage && kc.storage.type,
		notificationStatus: kc.notification && kc.notification.type,
		general: kc.general || {},
	};
}

function _partialGetter(key) {
	return async function _partialGetterInner(value) {
		const kc = await this.get();

		if (arguments.length) {
			kc[key] = value;
			return await kc.save();
		}

		return kc[key] || {};
	};
}

schema.statics.storageConfig = _partialGetter('storage');

schema.statics.notificationConfig = _partialGetter('notification');

schema.statics.generalConfig = _partialGetter('general');

export default schema;