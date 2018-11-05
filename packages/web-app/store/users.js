import moduleFactory from './module-factory'

export default moduleFactory('users', {
	state: {
		entities: {}
	},
	getters: {
		unassigned(state) {
			return state.entities['unassigned'];
		}
	}
})
