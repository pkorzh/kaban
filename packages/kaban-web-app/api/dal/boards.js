const { Board, Workflow } = require('./models')

const backlogsDal = require('./backlogs')

async function query() {
	return await Board.find({})
}

async function get({key}) {
	const board = await Board.findOne({key: key})
	const backlogs = await backlogsDal.query({board: board.key})

	return {
		...board.toJSON(),
		backlogs: backlogs.map(b => ({
			key: b.key,
			name: b.name,
			color: b.color,
		}))
	}
}

async function insert(boardSlim) {
	const board = new Board({
		...boardSlim,
		lanes: Workflow.getBoardLanes(),
	})

	await board.save()

	return board
}

module.exports = {
	query,
	get,
	insert,
}
