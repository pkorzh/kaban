const { Schema } = require('mongoose')

export default new Schema({
	domain: {
		type: String,
		required: false,
	}
}, {
	_id: false,
	timestamps: false,
});
