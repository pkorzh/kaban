import {
	Ticket,
	Workflow,
	TicketSpentIn
} from '../models';

import { mongo as generateMql } from '../../../tql';

import { DataBaseError } from '../../error-handlers';

import { track as trackHistory } from './history';

async function insert(ticketSlim) {
	if (!ticketSlim.status)
		ticketSlim.status = Workflow.getTicketInitialStatus()

	const ticket = new Ticket(ticketSlim)

	return await ticket.save()
}

async function count(tql) {
	return await Ticket.find(generateMql(tql)).countDocuments()
}

async function query(tql, limit, context = { board: null, user: null }) {
	const kwargs = generateMql(tql, {
		me({left}) {
			return { [left.lexeme + '.key']: { $eq: context.user.key } };
		},
	})

	if (!!context.board) {
		delete kwargs['status.key']
		kwargs['status.key'] = {
			$in: Workflow.getBoardStatus().map(s => s.key)
		}
	}

	const tickets = await Ticket.find(kwargs)
		.limit(Number(limit))
		.sort('rank')

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

async function patch(key, delta, user) {
	if (!user) {
		throw new DataBaseError('user_missing', {
			message: 'Please provide a user to patch'
		})
	}

	const oldTicket = await get(`key = ${key}`)

	await Ticket.updateOne({ key }, { $set: delta})

	const ticket = await get(`key = ${key}`)

	await trackHistory(oldTicket, ticket, user)

	return ticket
}

function remove(key) {
	return Ticket.deleteOne(generateMql(`key = ${key}`))
}

export {
	insert,
	query,
	patch,
	get,
	count,
	remove,
}
