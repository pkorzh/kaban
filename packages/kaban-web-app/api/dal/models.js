const mongoose = require('mongoose')

const {
	TicketSchema,
	BacklogSchema,
	BoardSchema,
	WorkflowSchema,
	WorkflowTransitionSchema,
} = require('./schemas')

const Ticket = mongoose.model('Ticket', TicketSchema)
const Backlog = mongoose.model('Backlog', BacklogSchema)
const Board = mongoose.model('Board', BoardSchema)
const Workflow = mongoose.model('Workflow', WorkflowSchema)
const WorkflowTransition = mongoose.model(
	'WorkflowTransition',
	WorkflowTransitionSchema
)

module.exports = {
	Ticket,
	Backlog,
	Board,
	Workflow,
	WorkflowTransition,
}
