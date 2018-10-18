import { TicketComment } from '../models'

import { mongo as generateMql } from '../../../tql'

export async function query(tql) {
	return await TicketComment.find(generateMql(tql))
}

export async function get(tql) {
	const comment = await query(tql)

	if (comment.length !== 1) {
		throw new Error('Get returned multiple elements')
	}

	return comment[0]
}


export async function insert(commentSlim) {
	const comment = new TicketComment(commentSlim)
	await comment.save()
	return comment
}


export async function patch(key, delta) {
	await TicketComment.update({ key }, { $set: delta})
	return get(`key = ${key}`)
}

export async function remove(key) {
	await TicketComment.deleteOne({ key })
}
