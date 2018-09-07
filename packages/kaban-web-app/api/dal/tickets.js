const {
	Ticket,
	Workflow,
	TicketSpentIn,
} = require('./models')

const generateMql = require('../../tql/mongo')

async function insert(ticketSlim) {
	ticketSlim.status = Workflow.getTicketInitialStatus()

	const ticket = new Ticket(ticketSlim)

	return await ticket.save()
}

async function count(tql) {
	return await Ticket.find(generateMql(tql)).count()
}

async function query(tql) {
	const tickets = await Ticket.find(generateMql(tql))

	let allSpentIns = await TicketSpentIn.find({
		'ticket.key': {$in: tickets.map(t => t.key)}
	})

	return tickets.map(t => t.toJSON()).map(ticket => {
		let spentIns = allSpentIns
			.filter(sin => sin.ticket.key === ticket.key)
			.reduce((spentIn, ticketSpentIn) => {
				if (!!spentIn[ticketSpentIn.status.key]) {
					if (spentIn[ticketSpentIn.status.key].createdAt < ticketSpentIn.createdAt) {
						spentIn[ticketSpentIn.status.key] = {
							createdAt: ticketSpentIn.createdAt,
							ms: ticketSpentIn.ms,
						}
					}
				} else {
					spentIn[ticketSpentIn.status.key] = {
						createdAt: ticketSpentIn.createdAt,
						ms: ticketSpentIn.ms
					}
				}

				return spentIn
			}, {});

		spentIns = Object.keys(spentIns).map(sinKey => ({[sinKey]: spentIns[sinKey].ms}))

		return { ...ticket, spentIns }
	})
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
	count,
}
