const { Schema } = require('mongoose')

const childSchemaOptions = {
	_id: false,
}

const StatusSchema = require('./status')(childSchemaOptions)
const PrioritySchema = require('./priority')(childSchemaOptions)
const UserSchema = require('./user')(childSchemaOptions)
const BacklogSchema = require('./backlog')(childSchemaOptions)
const TickettypeSchema = require('./tickettype')(childSchemaOptions)
const ResolutionSchema = require('./resolution')(childSchemaOptions)

module.exports = new Schema({
	key: {
		type: String,
		required: false,
		index: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	status: {
		type: StatusSchema,
		required: true,
	},
	priority: {
		type: PrioritySchema,
		required: true,
	},
	assignee: {
		type: UserSchema,
		required: false,
	},
	reporter: {
		type: UserSchema,
		required: false,
	},
	backlog: {
		type: BacklogSchema,
		required: true,
	},
	type: {
		type: TickettypeSchema,
		required: true,
	},
	resolvedAt: {
		type: Date,
		required: false,
	},
	resolution: ResolutionSchema
}, {
	timestamps: true
})
