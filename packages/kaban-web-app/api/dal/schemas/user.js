import bcrypt from 'bcrypt'
const { Schema } = require('mongoose')

const saltRounds = 10;

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
	},
	avatar: {
		type: String,
		required: false,
		default: 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
	},
	password: {
		type: String,

		required: false
	},
	permissions: {
		type: String,
		required: false,
		default: 'user'
	}
}, {
	timestamps: true
})

schema.pre('save', function(next){
	this.password = bcrypt.hashSync(this.password, saltRounds);

	next();
});

export default schema;
