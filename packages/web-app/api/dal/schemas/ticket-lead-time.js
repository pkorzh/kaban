const { Schema } = require('mongoose')

import KeySchema from './key'

const schema = new Schema({
	ticket: {
		type: KeySchema,
		required: true,
	},
	backlog: {
		type: KeySchema,
		required: true,
	},
	ms: {
		type: Number,
		required: true,
	}
}, {
	timestamps: true,
	strict: true,
	capped: {
		size: 512 * 1000,
		max: 1000,
	}
})

schema.statics.migrate = async function _migrate(from, to) {
	const oldItems = await this.find(from)
	const promises = []

	for (var i = oldItems.length - 1; i >= 0; i--) {
		const oldItem = oldItems[i].toJSON()

		const ticketLeadTime = new this({
			ticket: oldItem.ticket,
			backlog: to,
			ms: oldItem.ms || 0,
		})

		promises.push(ticketLeadTime.save())
	}

	return Promise.all(promises)
}

export default schema;