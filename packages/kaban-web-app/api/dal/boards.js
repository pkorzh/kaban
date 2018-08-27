const { Board, Workflow } = require('./models')

const generateMql = require('../../tql/mongo')

const backlogsDal = require('./backlogs')

async function query(tql) {
	return await Board.find(generateMql(tql))
}

async function get(tql) {
	const boards = await query(tql)

	if (boards.length !== 1) {
		throw new Error('Get returned multiple elements')
	}

	return boards[0]
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
	insert,
}
