const { Schema } = require('mongoose')

module.exports = new Schema({
	key: {
		type: String,
		required: true,
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
