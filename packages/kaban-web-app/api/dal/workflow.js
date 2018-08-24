const {
	Workflow,
	WorkflowTransition,
} = require('./models')

const ticketsDal = require('./tickets')

function WorkflowTransitionError({key, from, to}) {
	this.name = 'WorkflowTransitionError'
	this.from = from
	this.to = to
}
WorkflowTransitionError.prototype = new Error

async function transition(keys, mapsTo) {
	for (var i = 0; i < keys.length; i++) {
		const key = keys[i]

		let ticket = await ticketsDal.query(`key = ${key}`)
		ticket = ticket[0]

		const from = ticket.status.key
		const to = mapsTo

		if (Workflow.hasTransition(from, to)) {
			await ticketsDal.patch(key, {
				status: Workflow.status(to)
			})

			const ticketTransition = new WorkflowTransition({
				key,
				from: { key: from },
				to: { key: to },
				backlog: { key: ticket.backlog.key },
			})

			await ticketTransition.save()
		} else {
			throw new WorkflowTransitionError({
				key,
				from,
				to,
			})
		}
	}
}

function transitions() {
	return Workflow.transitions()
}

module.exports = {
	transition,
	transitions,
}
