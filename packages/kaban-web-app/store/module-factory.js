export default ({state, getters, actions, mutations}) => {
	const moduleState = () => (Object.assign({
		entities: {},
		list: [],
	}, state))

	const moduleGetters = Object.assign({
		getList(state) {
			return state.list.map(key => state.entities[key]);
		},
		getOne(state) {
			return key => state.entities[key];
		},
		query(state) {
			return predicate => state.list
				.map(key => state.entities[key])
				.filter(item => predicate(item));
		}
	}, getters)

	const moduleMutations = Object.assign({
		CREATE(state, payload) {
			const {id} = payload;
			state.list.push(id);
			state.entities[id] = payload;
		},
		CREATE_MULTIPLE(state, multiple) {
			multiple.forEach(payload =>
				moduleMutations.CREATE(state, payload))
		}
	}, mutations)

	const moduleActions = Object.assign({
	}, actions)

	return {
		namespaced: true,
		state: moduleState,
		getters: moduleGetters,
		mutations: moduleMutations,
		actions: moduleActions,
	}
}
