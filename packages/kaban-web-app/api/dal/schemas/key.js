const { Schema } = require('mongoose')

module.exports = new Schema({
	key: {
		type: String,
		required: true,
	}
}, {
	_id: false,
	timestamps: false,
})
