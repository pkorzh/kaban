const { Schema } = require('mongoose');

import KeySchema from '../key';

const schema = new Schema({
	key: {
		type: String,
		required: false,
		index: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
		index: 'text',
	},
	description: {
		type: String,
		required: false,
	},
	backlog: {
		type: KeySchema,
		required: true,
	},
	rank: {
		type: Number,
		required: false,
		min: 0,
		index: true,
	},
	reporter: {
		type: KeySchema,
		required: true,
	},
}, {
	timestamps: true,
	strict: true,
});

export default schema;