import Telegram from './telegram';

export default {
	from(config) {
		switch(config.type) {
			case 'telegram':
				return new Telegram(config);
			default:
				throw new Error('Unsupported notification type');
		}
	}
}

export {
	Telegram,
};