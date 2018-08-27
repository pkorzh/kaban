const { Schema } = require('mongoose')

const KeySchema = require('./key')

module.exports = new Schema({
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
	timestamps: true
})
