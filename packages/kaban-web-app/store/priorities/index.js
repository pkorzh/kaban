import moduleFactory from '../module-factory'

export default moduleFactory('tickets', {
	state: {
		entities: {
			'blocker': {
				id: 1,
				key: 'blocker',
				name: 'Blocker',
				iconUrl: '/priorities/blocker.svg',
			},
			'high': {
				id: 1,
				key: 'high',
				name: 'High',
				iconUrl: '/priorities/high.svg',
			},
			'low': {
				id: 1,
				key: 'low',
				name: 'Low',
				iconUrl: '/priorities/low.svg',
			},
			'trivial': {
				id: 1,
				key: 'trivial',
				name: 'Trivial',
				iconUrl: '/priorities/trivial.svg',
			},
		}
	}
})
