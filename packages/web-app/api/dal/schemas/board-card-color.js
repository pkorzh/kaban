const { Schema } = require('mongoose')

import KeySchema from './key'

export default new Schema({
	key: {
		type: String,
		required: true,
	},
	board: {
		type: KeySchema,
		required: true,
	},
	color: {
		type: String,
		required: true,
	},
	tql: {
		type: String,
		required: true,
	}
}, {
	timestamps: true,
	strict: true,
})
