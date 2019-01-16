const { Schema } = require('mongoose')

import KeySchema from './key'

export default new Schema({
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
	milestoneForecast: {
		type: [{}],
		required: false,
	},
}, {
	timestamps: true,
	strict: true,
})
