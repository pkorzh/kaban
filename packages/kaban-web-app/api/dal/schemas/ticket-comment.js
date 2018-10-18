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
	text: {
		type: String,
		required: true,
	},
	author: {
		type: KeySchema,
		required: true,	
	},
}, {
	timestamps: true,
	strict: true,
})

export default schema;