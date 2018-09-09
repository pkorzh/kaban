const { Schema } = require('mongoose')

const KeySchema = require('./key')

module.exports = new Schema({
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
