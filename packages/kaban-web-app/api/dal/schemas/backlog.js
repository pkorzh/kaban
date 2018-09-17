const { Schema } = require('mongoose')
const TicketSchema = require('./ticket')
const BacklogForeCastSchema = require('./backlog-forecast')
const TicketLeadTimeSchema = require('./ticket-lead-time')
const TicketSpendInSchema = require('./ticket-spent-in')
const WorkFlowTransitionsSchema = require('./workflow-transition')

const BacklogSchema = new Schema({
	key: {
		type: String,
		required: true,
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
	hardDeadlineAt: {
		type: Date,
		required: false,
	}
}, {
	timestamps: true
})

BacklogSchema.pre('remove', async function() {
	await BacklogForeCastSchema.remove({'backlog.key': this.key})
	await TicketSchema.remove({'backlog.key': this.key})
	await TicketLeadTimeSchema.remove({'backlog.key': this.key})
	await TicketSpendInSchema.remove({'backlog.key': this.key})
	await WorkFlowTransitionsSchema.remove({'backlog.key': this.key})
})

module.exports = BacklogSchema
