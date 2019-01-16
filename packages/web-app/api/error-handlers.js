import UnauthorizedError from 'express-jwt'
import MongoError from 'mongodb'

export function authErrorHandler(err, req, res, next) {
	if (!(err instanceof UnauthorizedError)) {
		throw err
	}

	if (err.code === 'permission_denied') {
		return res.status(403).json({
			name: err.code,
			message: err.message,
			stack: err.stack
		});
	}

	return res.status(401).json({
		name: err.status,
		message: err.message,
		stack: err.stack
	});
}

export function dbErrorHandler(err, req, res, next) {
	if (!(err instanceof DataBaseError)) {
		throw err
	}

	if (err.code === 'not_found') {
		return res.status(404).json({
			name: err.code,
			message: err.message,
			stack: err.stack
		})
	}

	return res.status(500).json({
		name: err.code,
		message: err.message,
		stack: err.stack
	})
}

export function errorHandler(err, req, res, next) {
	if (err.message === 'jwt expired') {
		return res.status(401).json(err);
	}

	return res.status(500).json({
		name: err.name,
		message: err.message,
		stack: err.stack
	})
}

export class DataBaseError extends Error {

	constructor(code, error) {
		super(error.message)

		this.name = 'DataBaseError'
		this.message = error.message
		this.code = code
		this.inner = error
	}
}
