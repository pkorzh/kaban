const { Ticket } = require('./models')

async function insert(ticketSlim) {
	const ticket = new Ticket(ticketSlim)
	return await ticket.save()
}

async function query() {
	return await Ticket.find({})
}

async function get({key}) {
	return await Ticket.findOne({key: key})
}

module.exports = {
	insert,
	query,
	get,
}
