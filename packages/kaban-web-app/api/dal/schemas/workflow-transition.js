const { Schema } = require('mongoose')

module.exports = (options = {}) => {
	return new Schema({
		key: {
			type: String,
			required: true,
		},
		from: {
			key: {
				type: String,
				required: true,
			}
		},
		to: {
			key: {
				type: String,
				required: true,
			}
		},
	}, Object.assign({}, options))
}
