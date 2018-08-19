const { Schema } = require('mongoose')

module.exports = (options = {}) => {
	return new Schema({
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
		},
		board: {
			key: {
				type: String,
				required: true,
			}
		}
	}, Object.assign({}, options))
}
