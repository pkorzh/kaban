const { Schema } = require('mongoose');

import KeySchema from './key';

const schema = new Schema({
	storage: {
		type: {}
	},
	notification: {
		type: {}
	},
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
	});

	await newOne.save()
	return newOne;
}

schema.statics.status = async function _status() {
	const kc = await this.get();

	return {
		storageStatus: kc.storage && kc.storage.type,
		notificationStatus: kc.notification && kc.notification.type,
	};
}

schema.statics.storageConfig = async function _storageConfig(storage) {
	const kc = await this.get();

	if (arguments.length) {
		kc.storage = storage;
		return await kc.save();
	}

	return kc.storage || {};
}

schema.statics.notificationConfig = async function _notificationConfig(notification) {
	const kc = await this.get();

	if (arguments.length) {
		kc.notification = notification;
		return await kc.save();
	}

	return kc.notification || {};
}

export default schema;