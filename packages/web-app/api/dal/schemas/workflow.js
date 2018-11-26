const { Schema } = require('mongoose')

function getSoftwareWorkflow() {
	const BACKLOG = 'backlog'
	const READY_TO_START = 'ready-to-start'
	const DEVELOPMENT = 'development'
	const CODE_REVIEW = 'code-review'
	const READY_TO_VERIFICATION = 'ready-to-verification'
	const VERIFICATION = 'verification'
	const CLOSED = 'closed'

	const STATUS = {
		[BACKLOG]: {
			key: BACKLOG,
			name: 'Backlog'
		},
		[READY_TO_START]: {
			key: READY_TO_START,
			name: 'Ready to Start'
		},
		[DEVELOPMENT]: {
			key: DEVELOPMENT,
			name: 'Development'
		},
		[CODE_REVIEW]: {
			key: CODE_REVIEW,
			name: 'Code Review'
		},
		[READY_TO_VERIFICATION]: {
			key: READY_TO_VERIFICATION,
			name: 'Ready to Verification'
		},
		[VERIFICATION]: {
			key: VERIFICATION,
			name: 'Verification'
		},
		[CLOSED]: {
			key: CLOSED,
			name: 'Closed'
		}
	}

	const TRANSITION = {
		[BACKLOG]: [READY_TO_START],
		[READY_TO_START]: [DEVELOPMENT, BACKLOG],
		[DEVELOPMENT]: [CODE_REVIEW, READY_TO_VERIFICATION],
		[CODE_REVIEW]: [READY_TO_VERIFICATION, DEVELOPMENT],
		[READY_TO_VERIFICATION]: [VERIFICATION],
		[VERIFICATION]: [DEVELOPMENT, CLOSED],
		[CLOSED]: []
	}

	const LANES = [
		{
			name: 'Ready to Start',
			key: 'ready-to-start',
			mapsTo: STATUS[READY_TO_START],
		},
		{
			name: 'In Progress',
			key: 'in-progress',
			mapsTo: [
				STATUS[DEVELOPMENT],
				STATUS[CODE_REVIEW],
				STATUS[READY_TO_VERIFICATION],
				STATUS[VERIFICATION],
			],
			queues: [
				{
					name: 'Doing',
					key: 'doing',
					mapsTo: STATUS[DEVELOPMENT],
				},
				{
					name: 'Code Review',
					key: 'code-review',
					mapsTo: STATUS[CODE_REVIEW],
				},
				{
					name: 'Ready to Verification',
					key: 'ready-to-verification',
					mapsTo: STATUS[READY_TO_VERIFICATION],
				},
				{
					name: 'Verification',
					key: 'verification',
					mapsTo: STATUS[VERIFICATION],
				}
			]
		},
	]

	return {
		LANES,
		STATUS,
		TRANSITION,
		BACKLOG,
		READY_TO_START,
		DEVELOPMENT,
		CODE_REVIEW,
		READY_TO_VERIFICATION,
		VERIFICATION,
		CLOSED,
	}
}

const SOFTWARE_WORKFLOW = getSoftwareWorkflow()

const WorkflowSchema = new Schema({
}, {
	timestamps: true
})

WorkflowSchema.statics.getTicketInitialStatus = function _getTicketInitialStatus() {
	return SOFTWARE_WORKFLOW.STATUS[SOFTWARE_WORKFLOW.BACKLOG]
}

WorkflowSchema.statics.getTicketInProgressStatus = function _getTicketInitialStatus() {
	return SOFTWARE_WORKFLOW.STATUS[SOFTWARE_WORKFLOW.DEVELOPMENT];
}

WorkflowSchema.statics.getTicketFinalStatus = function _getTicketFinalStatus() {
	return SOFTWARE_WORKFLOW.STATUS[SOFTWARE_WORKFLOW.CLOSED]
}

WorkflowSchema.statics.getBoardStatus = function _getBoardStatus() {
	return Object.keys(SOFTWARE_WORKFLOW.STATUS)
		.filter(status => [SOFTWARE_WORKFLOW.BACKLOG, SOFTWARE_WORKFLOW.CLOSED].indexOf(status) == -1)
		.map(key => SOFTWARE_WORKFLOW.STATUS[key])
}

WorkflowSchema.statics.getBoardLanes = function _getBoardLanes() {
	return SOFTWARE_WORKFLOW.LANES
}

WorkflowSchema.statics.hasTransition = function _transition({ key: from }, { key: to }) {
	return SOFTWARE_WORKFLOW.TRANSITION[from].indexOf(to) !== -1;
}

WorkflowSchema.statics.status = function _status(optionalStatus) {
	if (!!optionalStatus) {
		return SOFTWARE_WORKFLOW.STATUS[optionalStatus.key]
	} else {
		return Object.keys(SOFTWARE_WORKFLOW.STATUS).map(key => SOFTWARE_WORKFLOW.STATUS[key])
	}
}

WorkflowSchema.statics.transitions = function _transitions() {
	return SOFTWARE_WORKFLOW.TRANSITION
}

export default WorkflowSchema
