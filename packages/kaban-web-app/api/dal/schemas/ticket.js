const { Schema } = require('mongoose')

const KeySchema = require('./key')

module.exports = new Schema({
	key: {
		type: String,
		required: false,
		index: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: false,
	},
	status: {
		type: KeySchema,
		required: true,
	},
	priority: {
		type: KeySchema,
		required: true,
	},
	assignee: {
		type: KeySchema,
		required: true,
	},
	reporter: {
		type: KeySchema,
		required: true,
	},
	backlog: {
		type: KeySchema,
		required: true,
	},
	type: {
		type: KeySchema,
		required: true,
	},
	resolvedAt: {
		type: Date,
		required: false,
	},
	resolution: {
		type: KeySchema,
		required: false,
	}
}, {
	timestamps: true,
	strict: true,
})
