const {
	Workflow,
	WorkflowTransition,
	TicketSpentIn,
	TicketLeadTime,
} = require('./models')

function WorkflowTransitionError({key, from, to}) {
	this.name = 'WorkflowTransitionError'
	this.from = from
	this.to = to
}
WorkflowTransitionError.prototype = new Error

function transition(ticket, to) {
	const ticketTransition = new WorkflowTransition({
		ticket: { key: ticket.key },
		from: { key: ticket.status.key },
		to: { key: to.key },
		backlog: { key: ticket.backlog.key },
	})

	const ticketSpentIn = new TicketSpentIn({
		ticket,
		backlog: ticket.backlog,
		status: to,
		ms: new Date() - ticket.lastTransitionAt,
	})

	const promises = [
		ticketSpentIn.save(),
		ticketTransition.save(),
	]

	if (to.key === Workflow.getTicketFinalStatus().key) {
		const ticketLeadTime = new TicketLeadTime({
			ticket,
			backlog: ticket.backlog,
			ms: new Date() - ticket.createdAt,
		})

		promises.push(ticketLeadTime.save())
	}

	return Promise.all(promises)
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
