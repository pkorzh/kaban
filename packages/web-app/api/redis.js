import { promisify } from 'util';
import redis from 'redis';

const dummy = {
	publish() {

	},
	on() {

	},
};

export default function client() {
	if (!process.env.REDIS_HOST) {
		return dummy;
	}

	return redis.createClient({
		host: process.env.REDIS_HOST,
	});
}
