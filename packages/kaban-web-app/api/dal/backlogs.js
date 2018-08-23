const {
	Backlog,
	Workflow
} = require('./models')

const generateMql = require('../../tql/mongo')

async function insert(backlogSlim) {
	const backlog = new Backlog(backlogSlim)
	await backlog.save()
	return backlog
}

async function query(tql) {
	return await Backlog.find(generateMql(tql))
}

module.exports = {
	insert,
	query,
}
