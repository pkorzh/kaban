import TicketSchema from './base';
import MilestoneSchema from './milestone';

import ticketFactory from './ticket';

const BugSchema = ticketFactory();
const StorySchema = ticketFactory();

export {
	TicketSchema,
	MilestoneSchema,
	BugSchema,
	StorySchema,
};