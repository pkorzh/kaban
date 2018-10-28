const { Schema } = require('mongoose')

export default new Schema({
	key: {
		type: String,
		required: true,
	}
}, {
	_id: false,
	timestamps: false,
})
