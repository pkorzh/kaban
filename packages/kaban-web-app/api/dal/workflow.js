const { Workflow } = require('./models')

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
		const ticket = await ticketsDal.get({key})
		const from = ticket.status.key
		const to = mapsTo

		if (Workflow.hasTransition(from, to)) {
			await ticketsDal.patch(key, {
				status: Workflow.status(to)
			})
		} else {
			throw new WorkflowTransitionError({
				key,
				from,
				to,
			})
		}
	}
}

module.exports = {
	transition,
}
