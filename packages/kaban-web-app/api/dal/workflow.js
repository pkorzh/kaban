const {
	Workflow,
	WorkflowTransition,
} = require('./models')

function WorkflowTransitionError({key, from, to}) {
	this.name = 'WorkflowTransitionError'
	this.from = from
	this.to = to
}
WorkflowTransitionError.prototype = new Error

async function transition(ticket, to) {
	const ticketTransition = new WorkflowTransition({
		ticket: { key: ticket.key },
		from: { key: ticket.status.key },
		to: { key: to.key },
		backlog: { key: ticket.backlog.key },
	})

	await ticketTransition.save()
}

function transitions() {
	return Workflow.transitions()
}

function hasTransition(from, to) {
	return Workflow.transitions(from, to)
}

function status(status) {
	return Workflow.status(status)
}

async function zeroTransition(ticket) {
	const ticketTransition = new WorkflowTransition({
		ticket: { key: ticket.key },
		from: null,
		to: { key: Workflow.getTicketInitialStatus().key },
		backlog: { key: ticket.backlog.key },
	})

	await ticketTransition.save()
}

module.exports = {
	transition,
	transitions,
	hasTransition,
	zeroTransition,
	status,
}
