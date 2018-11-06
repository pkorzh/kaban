const { Schema } = require('mongoose')

import KeySchema from './key'

const schema = new Schema({
	key: {
		type: String,
		required: true,
	},
	ticket: {
		type: KeySchema,
		required: true,
	},
	user: {
		type: KeySchema,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	url: {
		type: String,
		required: true,
	},
}, {
	timestamps: true,
	strict: true,
})

export default schema;