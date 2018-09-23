import {Backlog} from "./models";

const {
	Ticket,
	Workflow,
	TicketSpentIn,
	TicketLeadTime
} = require('./models')

import { mongo as generateMql } from '../../tql'

async function insert(ticketSlim) {
	ticketSlim.status = Workflow.getTicketInitialStatus()

	const ticket = new Ticket(ticketSlim)

	return await ticket.save()
}

async function count(tql) {
	return await Ticket.find(generateMql(tql)).countDocuments()
}

async function query(tql, limit, context = { board: null }) {
	const kwargs = generateMql(tql)

	if (!!context.board) {
		delete kwargs['status.key']
		kwargs['status.key'] = {
			$in: Workflow.getBoardStatus().map(s => s.key)
		}
	}

	const tickets = await Ticket.find(kwargs)
		.limit(Number(limit))
		.sort({createdAt: 1})

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
	await Ticket.updateOne({ key }, { $set: delta})
	return get(`key = ${key}`)
}

Ticket.schema.pre('remove', async function() {
	await TicketLeadTime.remove(generateMql(`ticket = ${this.key}`))
	await TicketSpentIn.remove(generateMql(`ticket = ${this.key}`))
})

Ticket.schema.pre('save', async function() {
	console.log('works', this)
	const backlog = await Backlog.findOne(generateMql(`key = ${this.backlog.key}`))

	if (backlog.isArchived) {
		throw new Error('Can\'t create ticket, backlog is archived')
	}
})

export {
	insert,
	query,
	patch,
	get,
	count,
}
