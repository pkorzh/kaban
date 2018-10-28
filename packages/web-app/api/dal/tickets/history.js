import { TicketHistory } from '../models'

import { mongo as generateMql } from '../../../tql'

export async function query(tql) {
	return await TicketHistory.find(generateMql(tql))
}

export async function track(oldTicket, newTicket, user) {
	let changeset = []

	for(let [key, value] of Object.entries(newTicket)) {

		if ([
			'updatedAt', 
			'createdAt', 
			'lastTransitionAt'
			].indexOf(key) !== -1) {
			continue
		}

		if (JSON.stringify(oldTicket[key]) !== JSON.stringify(value)) {
			changeset.push({
				key: key,
				old: oldTicket[key],
				new: value
			})
		}
	}

	if (changeset.length == 0) {
		return
	}

	const ticketHistory = new TicketHistory({
		user,
		changeset,
		ticket: newTicket,
	})

	await ticketHistory.save()
}
