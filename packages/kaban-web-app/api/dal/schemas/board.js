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
		lanes: [
			{
				name: {
					type: String,
					required: false,
				},
				key: {
					type: String,
					required: false,
				},
				mapsTo: {},
				queues: [
					{
						name: {
							type: String,
							required: false,
						},
						key: {
							type: String,
							required: false,
						},
						mapsTo: {},
					},
				]
			}
		]
	}, Object.assign({}, options))
}
