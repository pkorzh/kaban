const { Schema } = require('mongoose')

module.exports = (options = {}) => {
	return new Schema({
		ticket: {
			key: {
				type: String,
				required: true,
			}
		},
		backlog: {
			key: {
				type: String,
				required: true,
			}
		},
		from: {
			type: {
				key: {
					type: String,
					required: true,
				}
			},
			required: false,
			default: null,
		},
		to: {
			key: {
				type: String,
				required: true,
			}
		},
	}, Object.assign({}, options))
}
