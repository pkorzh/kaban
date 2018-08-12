const {
	Backlog,
	Board,
	Workflow
} = require('./models')

async function insert(backlogSlim) {
	const backlog = new Backlog(backlogSlim)

	await backlog.save()

	const board = new Board({
		key: backlog.key,
		name: backlog.name,
		description: backlog.description,
		lanes: Workflow.getBoardLanes(),
		backlog: {
			key: backlog.key
		}
	})

	await board.save()

	return { backlog, board }
}

async function query() {
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
