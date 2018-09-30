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
		required: true,
	},
	avatar: {
		type: String,
		required: false,
		default: '/_nuxt/assets/images/kaban-logo.svg'
	},
	password: {
		type: String,
		trim: true,
		required: true
	}
}, {
	timestamps: true
})

schema.pre('save', function(next){
	this.password = bcrypt.hashSync(this.password, saltRounds);

	next();
});

export default schema;
