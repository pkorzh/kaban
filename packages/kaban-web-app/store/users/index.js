import moduleFactory from '../module-factory'

const unnasigned = {
	_id: -1,
	key: 'unassigned',
	name: 'Unassigned',
	email: null,
	avatar: 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png',
	active: null,
}

export default moduleFactory('users', {
	state: {
		entities: {}
	},
	getters: {
		unassigned(state) {
			return unnasigned;
		},
		getList(state) {
			return [
				unnasigned,
				...Object.keys(state.entities).map(key => state.entities[key])
			];
		},
	}
})
