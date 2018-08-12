import moduleFactory from '../module-factory'

export default moduleFactory('tickets', {
	state: {
		entities: {
			'story': {
				id: 1,
				key: 'story',
				name: 'Story',
				iconUrl: '/tickettypes/story.svg',
			},
			'bug': {
				id: 1,
				key: 'bug',
				name: 'Bug',
				iconUrl: '/tickettypes/bug.svg',
			}
		}
	}
})
