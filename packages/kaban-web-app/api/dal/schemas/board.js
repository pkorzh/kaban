const { Schema } = require('mongoose')

const BacklogSchema = require('./backlog')({_id: false})

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
		backlog: {
			type: BacklogSchema,
			required: true,
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
	}, Object.assign({}, options, {timestamps: true}))
}
