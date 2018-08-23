const { Board, Workflow } = require('./models')

const generateMql = require('../../tql/mongo')

const backlogsDal = require('./backlogs')

async function query(tql) {
	const boards = await Board.find(generateMql(tql))
	const backlogs = await backlogsDal.query(
		`board in [${boards.map(b => b.key).join(',')}]`
	)

	return boards.map(b => b.toJSON()).map(board => {
		return {
			...board,
			backlogs: backlogs
				.filter(b => b.board.key === board.key)
				.map(b => ({
					key: b.key,
					name: b.name,
					color: b.color,
				}))
		}
	})
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
