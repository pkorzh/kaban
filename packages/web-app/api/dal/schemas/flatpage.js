const { Schema } = require('mongoose')

export default new Schema({
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
