const { Schema } = require('mongoose')

import KeySchema from './key'

export default new Schema({
	ticket: {
		type: KeySchema,
		required: true
	},
	backlog: {
		type: KeySchema,
		required: true
	},
	from: {
		type: KeySchema,
		required: false,
		default: null,
	},
	to: {
		type: KeySchema,
		required: true
	},
}, {
	timestamps: true,
	strict: true,
})
