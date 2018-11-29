import {
	BacklogCreateHighlight,
	BacklogDeleteHighlight,
	BoardCreateHighlight,
	BoardDeleteHighlight,
	TicketCreateHighlight,
	TicketDeleteHighlight,
	TicketMoveHighlight,
	TicketHighlight,
	MultipleEditHighlight,
	UserCreateHighlight,
	UserDeleteHighlight,
	UserCreateSuccessHighlight,
} from '@/components';

import makeAction from './action-factory';

export const CreateTicketAction = makeAction(TicketCreateHighlight);
export const CreateBacklogAction = makeAction(BacklogCreateHighlight);
export const CreateBoardAction = makeAction(BoardCreateHighlight);

export const HighlightTicketAction = 
	makeAction(TicketHighlight, '75%');

export const TicketMultipleEdit = makeAction(MultipleEditHighlight);
export const DeleteBacklogAction = makeAction(BacklogDeleteHighlight);
export const DeleteBoardAction = makeAction(BoardDeleteHighlight);
export const CreateUserAction = makeAction(UserCreateHighlight);
export const CreateUserSuccessAction = makeAction(UserCreateSuccessHighlight);
export const DeleteUserAction = makeAction(UserDeleteHighlight);
export const DeleteTicketAction = makeAction(TicketDeleteHighlight);
export const MoveTicketAction = makeAction(TicketMoveHighlight);
