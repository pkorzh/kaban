const { Schema } = require('mongoose')

module.exports = (options = {}) => {
	return new Schema({
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
		email: {
			type: String,
			required: false,
		},
		avatar: {
			type: String,
			required: false,
		}
	}, Object.assign({}, options, {timestamps: true}))
}
