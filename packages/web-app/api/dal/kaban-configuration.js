import { KabanConfiguration } from './models';

export function storageConfig(...args) {
	return KabanConfiguration.storageConfig(...args);
}

export function notificationConfig(...args) {
	return KabanConfiguration.notificationConfig(...args);
}

export function generalConfig(...args) {
	return KabanConfiguration.generalConfig(...args);
}

export async function patchConfig(delta) {
	const one = await KabanConfiguration.get();
	await KabanConfiguration.updateOne({ _id: one._id }, { $set: delta});
}

export function get() {
	return KabanConfiguration.get();
}

export function status() {
	return KabanConfiguration.status();
}