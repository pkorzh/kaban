import { Ticket } from '../models';

import { mongo as generateMql } from '../../../tql';

import { get as getTicket } from './tickets';

export async function move(tql, after, before) {
	const beforeTicket = await getTicket(`key = ${before}`);
	const afterTicket = await getTicket(`key = ${after}`);

	let newRank = (beforeTicket.rank + afterTicket.rank) / 2;

	await Ticket.updateOne(generateMql(tql), { $set: {
		rank: newRank
	} })

	return {
		newRank,
	}
}