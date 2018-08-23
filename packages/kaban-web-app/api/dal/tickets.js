const {
	Ticket,
	Workflow,
	WorkflowTransition,
} = require('./models')

const generateMql = require('../../tql/mongo')

async function insert(ticketSlim) {
	ticketSlim.status = Workflow.getTicketInitialStatus()

	const ticket = new Ticket(ticketSlim)

	await new WorkflowTransition({
		key: ticket.key,
		backlog: {
			key: ticket.backlog.key,
		},
		to: {
			key: Workflow.getTicketInitialStatus().key
		}
	}).save()

	return await ticket.save()
}

async function query(tql) {
	return await Ticket.find(generateMql(tql))
}

async function patch(key, delta) {
	await Ticket.update({ key }, { $set: delta})
	const tickets = await query(`key = ${key}`)
	return tickets[0]
}

module.exports = {
	insert,
	query,
	patch,
}
