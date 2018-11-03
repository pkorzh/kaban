import bcrypt from 'bcrypt'
const { Schema } = require('mongoose')

const saltRounds = 10

const schema = new Schema({
	key: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: false,
	},
	email: {
		type: String,
		required: false,
		unique: true,
	},
	avatar: {
		type: String,
		required: false,
		default: '/default-avatar.svg'
	},
	password: {
		type: String,
		required: false,
		select: false,
		trim: true
	},
	scope: {
		type: String,
		required: false,
		default: 'user'
	}
}, {
	timestamps: true
})

schema.pre('save', function(next){
	this.password = bcrypt.hashSync(this.password, saltRounds)

	next()
})

export default schema
