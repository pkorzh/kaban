import TicketSchema from './base';
import MilestoneSchema from './milestone';

import ticket from './ticket';

const BugSchema = ticket.clone();
const StorySchema = ticket.clone();

export {
	TicketSchema,
	MilestoneSchema,
	BugSchema,
	StorySchema,
};