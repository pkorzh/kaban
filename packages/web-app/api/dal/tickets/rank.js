import { 
	Ticket, 
	Backlog,
} from '../models';

import { mongo as generateMql } from '../../../tql';

import { 
	query as queryTickets,
	get as getTicket,
} from './tickets';

const GAP = 10000;

export async function next() {
	const [ lastByRank ] = await Ticket.find({})
		.sort({rank: -1}).limit(1);

	if (!lastByRank) {
		return GAP;
	}

	return lastByRank.rank + GAP;
}

export async function rebalance() {
	const tickets = await Ticket.find({})
		.sort({rank: 1});

	const promises = [];

	for(let j = 0; j < tickets.length; j++) {
		promises.push(Ticket.updateOne({key: tickets[j].key}, {$set: {
			rank: (j + 1) * GAP
		}}));
	}

	return Promise.all(promises);	
}

export async function rank({keys, before, after}) {
	const targetTicket = await getTicket(`key = ${before || after}`);

	const siblingTicketFilterKwargs = {
		rank: before ? { $lt: targetTicket.rank } : { $gt: targetTicket.rank }
	};

	const siblingTicketSortKwargs = { rank: before ? -1 : 1 };

	const [ siblingTicket ] = await Ticket
		.find(siblingTicketFilterKwargs)
		.sort(siblingTicketSortKwargs)
		.limit(1);

	if (keys.length == 1) {
		const key = keys[0];

		const newRank = siblingTicket 
			? (targetTicket.rank + siblingTicket.rank) / 2
			: targetTicket.rank / 2;

		await Ticket.updateOne(generateMql(`key = ${key}`), { $set: {
			rank: newRank
		} });

		return [{ key, rank: newRank }];
	} else {
		//TODO: Implement multiple ranking
		return [];
	}
}