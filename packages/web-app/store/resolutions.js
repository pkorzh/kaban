import moduleFactory from './module-factory'

export default moduleFactory('priorities', {
	state: {
		entities: {
			'done': {
				key: 'done',
				name: 'Done',
			},
			'wont-do': {
				key: 'wont-do',
				name: 'Won\'t Do',
			},
			'cannot-reproduce': {
				key: 'cannot-reproduce',
				name: 'Cannot Reproduce',
			},
			'duplicate': {
				key: 'duplicate',
				name: 'Duplicate',
			},
			'unresolved': {
				key: 'unresolved',
				name: 'Unresolved',
			},
		}
	}
})
