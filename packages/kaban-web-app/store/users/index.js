import moduleFactory from '../module-factory'

export default moduleFactory('users', {
	state: {
		entities: {
			'platon.korzh': {
				_id: 1,
				key: 'platon.korzh',
				name: 'Platon Korzh',
				email: 'platon@korzh.io',
				avatar: 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png',
				active: true,
			},
			'unassigned': {
				_id: -1,
				key: 'unassigned',
				name: 'Unassigned',
				email: null,
				avatar: 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png',
				active: null,
			}
		}
	},
	getters: {
		unassigned(state) {
			return state.entities['unassigned']
		},
		current(state) {
			return state.entities['platon.korzh']
		}
	}
})
