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
	status: {
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
})
