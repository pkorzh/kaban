import { BoardCardColor } from '../models'

import { mongo as generateMql } from '../../../tql'

export async function query(tql) {
	return await BoardCardColor.find(generateMql(tql))
}

export async function get(tql) {
	const cardColors = await query(tql)

	if (cardColors.length !== 1) {
		throw new Error('Get returned multiple elements')
	}

	return cardColors[0]
}


export async function insert(cardColorSlim) {
	const cardColor = new BoardCardColor(cardColorSlim)
	await cardColor.save()
	return cardColor
}


export async function patch(key, delta) {
	await BoardCardColor.update({ key }, { $set: delta})
	return get(`key = ${key}`)
}
