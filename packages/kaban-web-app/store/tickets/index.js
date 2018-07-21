import moduleFactory from '../module-factory'

export default moduleFactory({
	state: {
		entities: {
			'cca-1': {
				id: 1,
				name: 'As a user i want to see my settings',
				key: 'cca-1',
				status: 'todo',
				backlog: {
					key: 'create-aws-api'
				}
			},
			'cca-2': {
				id: 2,
				name: 'As a user i want to be able to logout',
				key: 'cca-2',
				status: 'doneProgress',
				backlog: {
					key: 'create-aws-api'
				}
			}
		},
		list: [
			'cca-1',
			'cca-2'
		]
	}
});
