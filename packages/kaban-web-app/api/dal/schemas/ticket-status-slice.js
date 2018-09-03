const { Schema } = require('mongoose')

const KeySchema = require('./key')

module.exports = new Schema({
}, {
	timestamps: true,
	strict: false,
})
