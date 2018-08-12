const { Board } = require('./models')

async function query() {
	return await Board.find({})
}

async function get({key}) {
	return await Board.findOne({key: key})
}

module.exports = {
	query,
	get,
}
