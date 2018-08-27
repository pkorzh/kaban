const TicketSchema = require('./ticket')
const BacklogSchema = require('./backlog')
const BoardSchema = require('./board')
const WorkflowSchema = require('./workflow')
const WorkflowTransitionSchema = require('./workflow-transition')

module.exports = {
	TicketSchema,
	BacklogSchema,
	BoardSchema,
	WorkflowSchema,
	WorkflowTransitionSchema,
}
