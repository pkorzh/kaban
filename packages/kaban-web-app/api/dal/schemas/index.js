const TicketSchema = require('./ticket')
const BacklogSchema = require('./backlog')
const BoardSchema = require('./board')
const WorkflowSchema = require('./workflow')
const WorkflowTransitionSchema = require('./workflow-transition')
const TicketSpentInSchema = require('./ticket-spent-in')
const TicketStatusSliceSchema = require('./ticket-status-slice')
const FlatpageSchema = require('./flatpage')

module.exports = {
	TicketSchema,
	BacklogSchema,
	BoardSchema,
	WorkflowSchema,
	WorkflowTransitionSchema,
	TicketSpentInSchema,
	TicketStatusSliceSchema,
	FlatpageSchema,
}
