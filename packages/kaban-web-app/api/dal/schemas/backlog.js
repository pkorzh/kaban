import {BacklogForecast, WorkflowTransition} from "../models";
import {mongo as generateMql} from "../../../tql";

const { Schema } = require('mongoose')

const schema = new Schema({
	key: {
		type: String,
		required: true,
		index: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: false,
	},
	hardDeadlineAt: {
		type: Date,
		required: false,
	},
	isArchived: {
		type: Boolean,
		required: true,
		default: false
	}
}, {
	timestamps: true
})

schema.pre('remove', async function() {
	await BacklogForecast.remove(generateMql(`backlog = ${this.key}`))
	await WorkflowTransition.remove(generateMql(`backlog = ${this.key}`))
})

export default schema
