const {
	BoardCardColor,
} = require('../models')

const { mongo: generateMql } = require('../../../tql/dist')

async function query(tql) {
	return await BoardCardColor.find(generateMql(tql))
}

async function get(tql) {
	const cardColors = await query(tql)

	if (cardColors.length !== 1) {
		throw new Error('Get returned multiple elements')
	}

	return cardColors[0]
}


async function insert(cardColorSlim) {
	const cardColor = new BoardCardColor(cardColorSlim)
	await cardColor.save()
	return cardColor
}


async function patch(key, delta) {
	await BoardCardColor.update({ key }, { $set: delta})
	return get(`key = ${key}`)
}

module.exports = {
	query,
	insert,
	patch,
	get,
}
