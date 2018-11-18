import mongoose from 'mongoose'

import {
	TicketSchema,
	MilestoneSchema,
	BugSchema,
	StorySchema,
	BacklogSchema,
	BoardSchema,
	WorkflowSchema,
	WorkflowTransitionSchema,
	TicketSpentInSchema,
	TicketStatusSliceSchema,
	FlatpageSchema,
	TicketTimeSchema,
	BoardCardColorSchema,
	BacklogForecastSchema,
	UserSchema,
	TicketCommentSchema,
	TicketHistorySchema,
	TicketAttachmentSchema,
	KabanConfigurationSchema,
} from './schemas';

const Ticket = mongoose.model('Ticket', TicketSchema);
const Story = Ticket.discriminator('story', StorySchema);
const Bug = Ticket.discriminator('bug', BugSchema);
const Milestone = Ticket.discriminator('milestone', MilestoneSchema);

const Backlog = mongoose.model('Backlog', BacklogSchema);
const Board = mongoose.model('Board', BoardSchema);
const Workflow = mongoose.model('Workflow', WorkflowSchema);
const WorkflowTransition = mongoose.model(
	'WorkflowTransition',
	WorkflowTransitionSchema
);
const TicketSpentIn = mongoose.model('TicketSpentIn', TicketSpentInSchema);
const TicketStatusSlice = mongoose.model('TicketStatusSlice', TicketStatusSliceSchema);
const Flatpage = mongoose.model('Flatpage', FlatpageSchema);
const TicketTime = mongoose.model('TicketTime', TicketTimeSchema);
const BoardCardColor = mongoose.model('BoardCardColor', BoardCardColorSchema);
const BacklogForecast = mongoose.model('BacklogForecast', BacklogForecastSchema);
const User = mongoose.model('User', UserSchema);
const TicketComment = mongoose.model('TicketComment', TicketCommentSchema);
const TicketHistory = mongoose.model('TicketHistory', TicketHistorySchema);
const TicketAttachment = mongoose.model('TicketAttachment', TicketAttachmentSchema);
const KabanConfiguration = mongoose.model('KabanConfiguration', KabanConfigurationSchema);

export {
	Ticket,
	Story,
	Bug,
	Milestone,
	Backlog,
	Board,
	Workflow,
	WorkflowTransition,
	TicketSpentIn,
	TicketStatusSlice,
	Flatpage,
	TicketTime,
	BoardCardColor,
	BacklogForecast,
	User,
	TicketComment,
	TicketHistory,
	TicketAttachment,
	KabanConfiguration,
};
