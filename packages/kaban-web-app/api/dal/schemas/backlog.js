const { Schema } = require('mongoose')

module.exports = new Schema({
	key: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	color: {
		type: String,
		required: false,
	},
	description: {
		type: String,
		required: false,
	}
}, {
	timestamps: true
})
