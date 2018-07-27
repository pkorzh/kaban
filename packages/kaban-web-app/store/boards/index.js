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
						mapsTo: 'todo',
					},
					{
						name: 'Doing',
						key: 'inProgress',
						mapsTo: [
							'inProgress',
							'doneProgress',
						],
						queues: [
							{
								name: 'Doing',
								key: 'inProgress',
								mapsTo: 'inProgress'
							},
							{
								name: 'Done Doing',
								key: 'doneProgress',
								mapsTo: 'doneProgress'
							}
						]
					},
					{
						name: 'Done',
						key: 'done',
						mapsTo: 'done',
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
						mapsTo: 'todo',
					},
					{
						name: 'Doing',
						key: 'inProgress',
						mapsTo: [
							'inProgress',
							'doneProgress',
						],
						queues: [
							{
								name: 'Doing',
								key: 'inProgress',
								mapsTo: 'inProgress'
							},
							{
								name: 'Done Doing',
								key: 'doneProgress',
								mapsTo: 'doneProgress'
							}
						]
					},
					{
						name: 'Done',
						key: 'done',
						mapsTo: 'done',
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
