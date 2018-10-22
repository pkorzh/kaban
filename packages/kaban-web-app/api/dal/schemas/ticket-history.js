const { Schema } = require('mongoose')

import KeySchema from './key'

const schema = new Schema({
	ticket: {
		type: KeySchema,
		required: true,
	},
	user: {
		type: KeySchema,
		required: true,
	},
	changeset: {
		type: {},
		required: true,
	},
}, {
	timestamps: true,
	strict: true,
})

export default schema;