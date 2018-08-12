const { Schema } = require('mongoose')

module.exports = (options = {}) => {
	const WorkflowSchema = new Schema({
	}, Object.assign({}, options, {timestamps: true}))

	WorkflowSchema.statics.getBoardLanes = function getBoardLanes() {
		return [
			{
				name: 'To-Do',
				key: 'todo',
				mapsTo: { key: 'todo' },
			},
			{
				name: 'Analysis',
				key: 'analysis',
				mapsTo: { key: 'analysis' },
			},
			{
				name: 'Doing',
				key: 'inProgress',
				mapsTo: [
					{ key: 'inProgress' },
					{ key: 'doneProgress' },
				],
				queues: [
					{
						name: 'Doing',
						key: 'inProgress',
						mapsTo: { key: 'inProgress' }
					},
					{
						name: 'Done Doing',
						key: 'doneProgress',
						mapsTo: { key: 'doneProgress' }
					}
				]
			},
			{
				name: 'Verifying',
				key: 'verifying',
				mapsTo: { key: 'verifying' },
			},
			{
				name: 'Done',
				key: 'done',
				mapsTo: { key: 'done' },
			}
		]
	}

	return WorkflowSchema
}
