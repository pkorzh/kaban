const TicketSchema = require('./ticket')
const BacklogSchema = require('./backlog')()
const BoardSchema = require('./board')()
const WorkflowSchema = require('./workflow')()

module.exports = {
	TicketSchema,
	BacklogSchema,
	BoardSchema,
	WorkflowSchema,
}
