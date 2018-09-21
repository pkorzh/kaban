import { Backlog, Workflow, BacklogForecast, } from './models'

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
	return await Backlog.find(generateMql(tql)).count()
}

async function get(tql) {
	const backlogs = await query(tql)

	if (backlogs.length !== 1) {
		throw new Error('Get returned multiple elements')
	}

	return backlogs[0]
}

async function patch(key, delta) {
	await Backlog.update({ key }, { $set: delta})
	return get(`key = ${key}`)
}

async function forecast(key) {
	return await BacklogForecast.findOne({'backlog.key': key})
}

export {
	insert,
	query,
	patch,
	count,
	forecast,
}
