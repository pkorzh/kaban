const {
	Backlog,
	Workflow,
	BacklogForecast,
} = require('./models')

const { mongo: generateMql } = require('../../tql/dist')

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

async function remove(key) {
	await Backlog.deleteOne({ key })
}

async function forecast(key) {
	return await BacklogForecast.findOne({'backlog.key': key})
}

module.exports = {
	insert,
	query,
	patch,
	count,
	forecast,
	remove
}
