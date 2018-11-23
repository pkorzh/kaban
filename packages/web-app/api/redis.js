import { promisify } from 'util';
import redis from 'redis';

export default function client() {
	const client = redis.createClient();
	return client;
}