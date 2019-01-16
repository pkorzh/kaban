const { Schema } = require('mongoose')

export default new Schema({
	key: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: false,
	},
	description: {
		type: String,
		required: false,
	},
}, {
	timestamps: true
})
