const mongoose = require('mongoose')

const {
	TicketSchema,
	BacklogSchema,
	BoardSchema,
	WorkflowSchema,
	WorkflowTransitionSchema,
	TicketSpentInSchema,
	TicketStatusSliceSchema,
} = require('./schemas')

const Ticket = mongoose.model('Ticket', TicketSchema)
const Backlog = mongoose.model('Backlog', BacklogSchema)
const Board = mongoose.model('Board', BoardSchema)
const Workflow = mongoose.model('Workflow', WorkflowSchema)
const WorkflowTransition = mongoose.model(
	'WorkflowTransition',
	WorkflowTransitionSchema
)
const TicketSpentIn = mongoose.model('TicketSpentIn', TicketSpentInSchema)
const TicketStatusSlice = mongoose.model('TicketStatusSlice', TicketStatusSliceSchema)

module.exports = {
	Ticket,
	Backlog,
	Board,
	Workflow,
	WorkflowTransition,
	TicketSpentIn,
	TicketStatusSlice,
}
