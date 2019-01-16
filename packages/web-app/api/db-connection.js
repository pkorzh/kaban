import mongoose from 'mongoose';

function connectIfNeeded() {
	if (mongoose.connection.readyState == 1 || mongoose.connection.readyState == 2) {
		return Promise.resolve();
	}

	const dbHost = process.env.DB_HOST;
	const dbName = process.env.DB_NAME;
	const dbUser = process.env.DB_USER;
	const dbPass = process.env.DB_PASS;

	return mongoose.connect(`mongodb://${dbUser}:${dbPass}@${dbHost}/${dbName}`, {
		useNewUrlParser: true,
	});
}

export function ensureDbConnection(req, res, next) {
	connectIfNeeded().then(() => next()).catch((e) => next(e));
}