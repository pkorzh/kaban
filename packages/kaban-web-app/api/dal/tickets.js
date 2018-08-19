const {
	Ticket,
	Workflow,
	WorkflowTransition,
} = require('./models')

async function insert(ticketSlim) {
	ticketSlim.status = Workflow.getTicketInitialStatus()

	const ticket = new Ticket(ticketSlim)

	await new WorkflowTransition({
		key: ticket.key,
		to: {
			key: Workflow.getTicketInitialStatus().key
		}
	}).save()

	return await ticket.save()
}

async function query() {
	return await Ticket.find({})
}

async function get({key}) {
	return await Ticket.findOne({key: key})
}

async function patch(key, delta) {
	await Ticket.update({ key }, { $set: delta})
	return await get({key})
}

module.exports = {
	insert,
	query,
	get,
	patch,
}
