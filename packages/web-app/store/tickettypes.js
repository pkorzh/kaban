import moduleFactory from './module-factory'

export default moduleFactory('tickettypes', {
	state: {
		entities: {
			'story': {
				key: 'story',
				name: 'Story',
				iconUrl: '/tickettypes/story.svg',
			},
			'bug': {
				key: 'bug',
				name: 'Bug',
				iconUrl: '/tickettypes/bug.svg',
			},
			'milestone': {
				key: 'milestone',
				name: 'Milestone',
				iconUrl: '/tickettypes/bug.svg',
			}
		}
	}
})
