const TicketSchema = require('./ticket')
const BacklogSchema = require('./backlog')({timestamps: true})
const BoardSchema = require('./board')({timestamps: true})
const WorkflowSchema = require('./workflow')({timestamps: true})

module.exports = {
	TicketSchema,
	BacklogSchema,
	BoardSchema,
	WorkflowSchema,
}
