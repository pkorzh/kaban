const { Flatpage } = require('./models')

const generateMql = require('../../tql/mongo')

async function query(tql, includeContent) {
	return await Flatpage.find(generateMql(tql), { content: 0 })
}

async function get(tql) {
	const flatpages = await query(tql)

	if (flatpages.length !== 1) {
		throw new Error('Get returned multiple elements')
	}

	return flatpages[0]
}

async function insert(flatpageSlim) {
	const flatpage = new Flatpage(flatpageSlim)
	await flatpage.save()
	return flatpage
}

async function patch(key, delta) {
	await Flatpage.update({ key }, { $set: delta})
	return get(`key = ${key}`)
}

async function content(key) {
	const flatpages = await Flatpage.find(generateMql(`key = ${key}`), {content: 1})

	if (flatpages.length !== 1) {
		throw new Error('Get returned multiple elements')
	}

	return flatpages[0]
}

module.exports = {
	query,
	insert,
	get,
	patch,
	content,
}
