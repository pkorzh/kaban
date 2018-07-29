import Vue from 'Vue'

export default ({state, getters, actions, mutations}) => {
	const moduleState = () => (Object.assign({
		entities: {}
	}, state))

	const moduleGetters = Object.assign({
		getList(state) {
			return Object.keys(state.entities).map(key => state.entities[key]);
		},
		getOne(state) {
			return key => state.entities[key];
		},
		query(state) {
			return predicate => moduleGetters
				.getList(state)
				.filter(predicate)
		}
	}, getters)

	const moduleMutations = Object.assign({
		CREATE(state, payload) {
			Vue.set(state.entities, payload.key, payload)
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
