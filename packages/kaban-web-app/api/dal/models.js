const mongoose = require('mongoose')

const {
	TicketSchema,
	BacklogSchema,
	BoardSchema,
	WorkflowSchema,
} = require('./schemas')

const Ticket = mongoose.model('Ticket', TicketSchema)
const Backlog = mongoose.model('Backlog', BacklogSchema)
const Board = mongoose.model('Board', BoardSchema)
const Workflow = mongoose.model('Workflow', WorkflowSchema)

module.exports = {
	Ticket,
	Backlog,
	Board,
	Workflow,
}
