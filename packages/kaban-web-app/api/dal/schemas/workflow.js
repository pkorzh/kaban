const { Schema } = require('mongoose')

function getSoftwareWorkflow() {
	const BACKLOG = 'backlog'
	const READY_TO_START = 'ready-to-start'
	const DEVELOPMENT = 'development'
	const CODE_REVIEW = 'code-review'
	const READY_TO_VERIFICATION = 'ready-to-verification'
	const VERIFICATION = 'verification'

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

	return { LANES, STATUS }
}

const SOFTWARE_WORKFLOW = getSoftwareWorkflow()

module.exports = (options = {}) => {
	const WorkflowSchema = new Schema({
	}, Object.assign({}, options, {timestamps: true}))

	WorkflowSchema.statics.getTicketInitialStatus = function _getTicketInitialStatus() {
		return SOFTWARE_WORKFLOW.LANES[0].mapsTo
	}

	WorkflowSchema.statics.getBoardLanes = function _getBoardLanes() {
		return SOFTWARE_WORKFLOW.LANES
	}

	return WorkflowSchema
}
