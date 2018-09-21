const { Schema } = require('mongoose')

import KeySchema from './key'

export default new Schema({
	ticket: {
		type: KeySchema,
		required: true,
	},
	backlog: {
		type: KeySchema,
		required: true,
	},
	ms: {
		type: Number,
		required: true,
	}
}, {
	timestamps: true,
	strict: true,
	capped: {
		size: 512 * 1000,
		max: 1000,
	}
})
