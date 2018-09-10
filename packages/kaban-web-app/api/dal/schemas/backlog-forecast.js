const { Schema } = require('mongoose')

const KeySchema = require('./key')

module.exports = new Schema({
	backlog: {
		type: KeySchema,
		required: true,
	},
	forecastEndAt: {
		type: [Date],
		required: false,
	},
	var: {
		type: Number,
		required: false,
	},
	p50: {
		type: Number,
		required: false,
	},
	p99: {
		type: Number,
		required: false,
	},
	avg: {
		type: Number,
		required: false,
	},
}, {
	timestamps: true,
	strict: true,
})
