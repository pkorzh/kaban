const { Schema } = require('mongoose')

const KeySchema = require('./key')

module.exports = new Schema({
	ticket: {
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
