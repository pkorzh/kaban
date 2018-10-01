import {BoardCardColor} from "../models";
import {mongo as generateMql} from "../../../tql";

const { Schema } = require('mongoose')

const schema = new Schema({
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
	description: {
		type: String,
		required: false,
	},
	tql: {
		type: String,
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
}, {
	timestamps: true
})

schema.pre('remove', async function() {
	await BoardCardColor.remove(generateMql(`board = ${this.key}`))
})

export default schema
