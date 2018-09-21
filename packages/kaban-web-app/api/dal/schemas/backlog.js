const { Schema } = require('mongoose')

const BacklogSchema = new Schema({
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

module.exports = BacklogSchema
