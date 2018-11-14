import {
	Backlog, 
	Ticket, 
	TicketSpentIn, 
	TicketTime,
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
		index: 'text',
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
	resolution: {
		type: KeySchema,
		required: false,
	},
	lastTransitionAt: {
		type: Date,
		required: true,
	},
	rank: {
		type: Number,
		required: false,
		min: 0,
		index: true,
	}
}, {
	timestamps: true,
	strict: true,
});

schema.pre('remove', async function() {
	const kwargs = generateMql(`ticket = ${this.key}`);

	await TicketSpentIn.remove(kwargs)
	await TicketTime.remove(kwargs)
	await TicketStatusSlice.remove(kwargs)
})

schema.pre('save', async function() {
	const backlog = await Backlog.findOne(generateMql(`key = ${this.backlog.key}`))

	if (backlog.isArchived) {
		throw new Error('Can\'t create ticket, backlog is archived')
	}
})

schema.pre('updateOne', async function() {
	const ticket = await Ticket.findOne(this._conditions);
	
	const backlog = await Backlog.findOne(generateMql(`key = ${ticket.backlog.key}`));

	if (backlog && backlog.isArchived) {
		throw new Error('Can\'t update ticket, backlog is archived');
	}
})

export default schema
