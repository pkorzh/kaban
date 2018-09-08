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
		required: false,
	},
	content: {
		type: String,
		required: true,
	}
}, {
	timestamps: true
})
