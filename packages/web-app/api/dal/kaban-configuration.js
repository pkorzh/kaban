import { KabanConfiguration } from './models';

export function storageConfig(config) {
	if (arguments.length) {
		return KabanConfiguration.storageConfig(config);
	}

	return KabanConfiguration.storageConfig();
}

export function status() {
	return KabanConfiguration.status();
}