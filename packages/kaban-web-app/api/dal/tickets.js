const {
	Ticket,
	Workflow,
} = require('./models')

const generateMql = require('../../tql/mongo')

async function insert(ticketSlim) {
	ticketSlim.status = Workflow.getTicketInitialStatus()

	const ticket = new Ticket(ticketSlim)

	return await ticket.save()
}

async function query(tql) {
	return await Ticket.find(generateMql(tql))
}

async function get(tql) {
	const tickets = await query(tql)

	if (tickets.length !== 1) {
		throw new Error('Get returned multiple elements')
	}

	return tickets[0]
}

async function patch(key, delta) {
	await Ticket.update({ key }, { $set: delta})
	return get(`key = ${key}`)
}

module.exports = {
	insert,
	query,
	patch,
	get,
}
