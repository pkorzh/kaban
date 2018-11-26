import { promisify } from 'util';
import redis from 'redis';

export default function client() {
	const client = redis.createClient({
		host: process.env.REDIS_HOST,
	});
	return client;
}
