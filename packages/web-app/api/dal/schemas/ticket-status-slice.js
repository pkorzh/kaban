const { Schema } = require('mongoose')

import KeySchema from './key'

export default new Schema({
}, {
	timestamps: true,
	strict: false,
})
