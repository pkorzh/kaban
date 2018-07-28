import moduleFactory from '../module-factory'

export default moduleFactory({
	state: {
		entities: {
			'ama': {
				id: 1,
				key: 'ama',
				name: 'Android Mobile Application',
				backlog: {
					key: 'create-aws-api'
				},
				lanes: [
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
			},
			'nfp': {
				id: 1,
				key: 'nfp',
				name: 'Native Feed & Profile',
				backlog: {
					key: 'native-feed-profile'
				},
				lanes: [
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
		},
		list: [
			'ama',
			'nfp',
		]
	}
});
