const {
	Board,
	Workflow,
} = require('../models')

const { mongo: generateMql } = require('../../../tql/dist')

const backlogsDal = require('../backlogs')
const cardColor = require('./card-color')

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


async function patch(key, delta) {
	await Board.update({ key }, { $set: delta})
	return get(`key = ${key}`)
}


module.exports = {
	query,
	insert,
	patch,
	get,
	cardColor,
}
