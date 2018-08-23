const { Schema } = require('mongoose')

module.exports = (options = {}) => {
	return new Schema({
		key: {
			type: String,
			required: true,
		},
		backlog: {
			key: {
				type: String,
				required: true,
			}
		},
		from: {
			key: {
				type: String,
				required: false,
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
