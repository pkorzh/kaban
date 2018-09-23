const { Schema } = require('mongoose')

module.exports = new Schema({
	key: {
		type: String,
		required: true,
		index: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: false,
	},
	hardDeadlineAt: {
		type: Date,
		required: false,
	}
}, {
	timestamps: true
})
