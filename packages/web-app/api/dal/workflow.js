import {
	Workflow,
	WorkflowTransition,
	TicketSpentIn,
	TicketTime,
} from './models'

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
		const [ inProgressTransition ] = await WorkflowTransition.find({
			'to.key': Workflow.getTicketInProgressStatus().key,
			'ticket.key': ticket.key,
		}).sort('createdAt').limit(1);

		const ticketTime = new TicketTime({
			ticket,
			backlog: ticket.backlog,
			lead_time: new Date() - ticket.createdAt,
			cycle_time: new Date() - inProgressTransition.createdAt,
		});

		promises.push(ticketTime.save());
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

export {
	transition,
	transitions,
	hasTransition,
	zeroTransition,
	status,
}
