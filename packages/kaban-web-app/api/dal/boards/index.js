import { Board, BoardCardColor,
	Workflow} from '../models'

import { mongo as generateMql } from '../../../tql'

import * as backlogsDal from '../backlogs'
import * as cardColor from './card-color'

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

async function remove(key) {
	return await Board.remove({ key })
}

Board.schema.pre('remove', async function() {
	await BoardCardColor.remove(generateMql(`board = ${this.key}`))
})


export {
	query,
	insert,
	patch,
	get,
	remove,
	cardColor,
}
