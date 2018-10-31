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
	fileName: {
		type: String,
		required: true,
	},
	fileURL: {
		type: String,
		required: true,
	},
}, {
	timestamps: true,
	strict: true,
})

export default schema;