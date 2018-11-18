import {
	Story,
	Bug,
	Milestone,
	Ticket,
	Workflow,
	TicketSpentIn,
	TicketTime,
	TicketStatusSlice,
} from '../models';

import { mongo as generateMql } from '../../../tql';

import { DataBaseError } from '../../error-handlers';

import { track as trackHistory } from './history';

function _includeType(t) {
	if (t.type) {
		return t;
	}

	const type = {
		key: t.__t
	};

	return { ...t, type };
}

async function insert(ticketSlim) {
	let Klass;

	switch(ticketSlim.type.key) {
		case 'story':
			Klass = Story;
			break;
		case 'bug':
			Klass = Bug;
			break;
		case 'milestone':
			Klass = Milestone;
			break;
	}

	if (!ticketSlim.status)
		ticketSlim.status = Workflow.getTicketInitialStatus();

	const ticket = new Klass(ticketSlim);
	await ticket.save();

	return _includeType(ticket.toJSON());
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
		delete kwargs['status.key'];
		kwargs['status.key'] = {
			$in: Workflow.getBoardStatus().map(s => s.key)
		};
	}

	const tickets = await Ticket.find(kwargs)
		.limit(Number(limit))
		.sort('rank');

	return tickets.map(t => t.toJSON()).map(_includeType);
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

async function move(changeset) {
	for (let i = changeset.length - 1; i >= 0; i--) {
		const item = changeset[i];
		const ticket = await get(`key = ${item.ticketKey}`);

		const p1 = Ticket.updateOne(
			generateMql(`key = ${item.ticketKey}`),
			{$set: { backlog: {key: item.backlogKey}}}
		);

		const p2 = TicketSpentIn.updateMany(
			generateMql(`key = ${item.ticketKey}`),
			{$set: { backlog: {key: item.backlogKey}}},
		);

		const p3 = TicketTime.migrate(
			{'ticket.key': item.ticketKey}, 
			{key: item.backlogKey},
		);

		const p4 = TicketStatusSlice.updateMany(
			generateMql(`key = ${item.backlogKey}`),
			{$set: { backlog: {key: item.backlogKey}}},
		);

		await Promise.all([p1, p2, p3, p4]);
	}
}

export {
	insert,
	query,
	patch,
	get,
	count,
	remove,
	move,
}
