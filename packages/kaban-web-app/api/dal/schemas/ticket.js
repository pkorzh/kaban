import {
	Backlog, 
	Ticket, 
	TicketSpentIn, 
	TicketLeadTime,
	TicketStatusSlice,
} from "../models"

const { Schema } = require('mongoose')

import KeySchema from './key'
import {mongo as generateMql} from "../../../tql"

const schema = new Schema({
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
		required: false,
	},
	status: {
		type: KeySchema,
		required: true,
	},
	priority: {
		type: KeySchema,
		required: true,
	},
	assignee: {
		type: KeySchema,
		required: true,
	},
	reporter: {
		type: KeySchema,
		required: true,
	},
	backlog: {
		type: KeySchema,
		required: true,
	},
	type: {
		type: KeySchema,
		required: true,
	},
	resolvedAt: {
		type: Date,
		required: false,
	},
	resolution: {
		type: KeySchema,
		required: false,
	},
	lastTransitionAt: {
		type: Date,
		required: true,
	},
	spentIn: {
		type: {},
		required: false,
	}
}, {
	timestamps: true,
	strict: true,
})

schema.pre('remove', async function() {
	await TicketSpentIn.remove(generateMql(`ticket = ${this.key}`))
	await TicketLeadTime.remove(generateMql(`backlog = ${this.key}`))
	await TicketStatusSlice.remove(generateMql(`backlog = ${this.key}`))
})

schema.pre('save', async function() {
	const backlog = await Backlog.findOne(generateMql(`key = ${this.backlog.key}`))

	if (backlog.isArchived) {
		throw new Error('Can\'t create ticket, backlog is archived')
	}
})

schema.pre('updateOne', async function() {
	const ticket = await Ticket.findOne(generateMql(`key = ${this._conditions.key}`))
	const backlog = await Backlog.findOne(generateMql(`key = ${ticket.backlog.key}`))

	if (backlog.isArchived) {
		throw new Error('Can\'t update ticket, backlog is archived')
	}
})

export default schema
