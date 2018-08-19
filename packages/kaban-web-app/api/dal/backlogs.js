const {
	Backlog,
	Workflow
} = require('./models')

async function insert(backlogSlim) {
	const backlog = new Backlog(backlogSlim)
	await backlog.save()
	return backlog
}

async function query({board} = {}) {

	if (board) {
		return Backlog.find({'board.key': board})
	}

	return await Backlog.find({})
}

async function get({key}) {
	return await Backlog.findOne({key: key})
}

module.exports = {
	insert,
	query,
	get,
}
