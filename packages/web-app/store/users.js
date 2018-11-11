import moduleFactory from './module-factory'

export default moduleFactory('users', {
	state: {
		entities: {}
	},
	getters: {
		unassigned(state) {
			return state.entities['unassigned'];
		},
		getOne(state, _getters, { auth: { user } }) {
			return key => {
				if (key === 'me') {
					return user;
				}

				return state.entities[key];
			};
		},
	}
})
