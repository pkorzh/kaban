import {
	Backlog,
	WorkflowTransition,
	Ticket,
	TicketLeadTime,
	TicketSpentIn,
	BacklogForecast,
} from './models'

import { mongo as generateMql } from '../../tql'

async function insert(backlogSlim) {
	const backlog = new Backlog(backlogSlim)
	await backlog.save()
	return backlog
}

async function query(tql) {
	return await Backlog.find(generateMql(tql))
}

async function count(tql) {
	return await Backlog.find(generateMql(tql)).countDocuments()
}

async function get(tql) {
	const backlogs = await query(tql)

	if (backlogs.length !== 1) {
		throw new Error('Get returned multiple elements')
	}

	return backlogs[0]
}

async function patch(key, delta) {
	await Backlog.updateOne({ key }, { $set: delta})
	return get(`key = ${key}`)
}

async function removeAndMigrate(key, migrateKey) {
	await Ticket.update(generateMql(`backlog = ${key}`),
			{$set: { backlog: {key: migrateKey}}},
			{multi: true}
		)

	await TicketLeadTime.update(generateMql(`backlog = ${key}`),
		{$set: { backlog: {key: migrateKey}}},
		{multi: true}
	)

	await TicketSpentIn.update(generateMql(`backlog = ${key}`),
		{$set: { backlog: {key: migrateKey}}},
		{multi: true}
	)

	return await Backlog.remove({ key })
}

async function remove(key) {
	await Ticket.remove(generateMql(`backlog = ${key}`))

	return await Backlog.remove({ key })
}

async function forecast(key) {
	return await BacklogForecast.findOne({'backlog.key': key})
}


Backlog.schema.pre('remove', async function() {
	await BacklogForecast.remove(generateMql(`backlog = ${this.key}`))
 	await WorkflowTransition.remove(generateMql(`backlog = ${this.key}`))
});

export {
	insert,
	query,
	patch,
	count,
	forecast,
	remove,
	removeAndMigrate
}
