import Vue from 'vue'

export default (resource, {state, getters, actions, mutations, patchReducers = {}}) => {
	const moduleState = () => (Object.assign({
		entities: {},
	}, state))

	const moduleGetters = Object.assign({
		getList(state) {
			return Object.keys(state.entities).map(key => state.entities[key]);
		},
		getOne(state) {
			return key => state.entities[key];
		},
		queryList(state) {
			return predicate => moduleGetters
				.getList(state)
				.filter(predicate)
		}
	}, getters)

	const moduleMutations = Object.assign({
		STAGE(state, payload) {
			Vue.set(state.entities, payload.key, payload)
		},
		STAGE_MULTIPLE(state, multiple) {
			multiple.forEach(payload =>
				moduleMutations.STAGE(state, payload))
		}
	}, mutations)

	const moduleActions = Object.assign({
		async fetchList({commit}, query = {}) {
			const rawList = await this.$axios.$get(
				`/api/${resource}/`,
				{
					params: query
				},
			)

			commit('STAGE_MULTIPLE', rawList)
		},
		async fetchOne({commit}, key) {
			const rawEntity = await this.$axios.$get(`/api/${resource}/${key}/`)
			commit('STAGE', rawEntity)
		},
		create({commit}, entity) {
			return this.$axios.$post(`/api/${resource}/`, entity).then((data) => {
				commit('STAGE', data)
				return data
			})
		},
		patch({commit}, {delta, key}) {
			const reducedDelta = {}

			Object.keys(delta).forEach(deltaKey => {
				if (deltaKey in patchReducers) {
					reducedDelta[deltaKey] = patchReducers(delta[reducedDelta])
				} else {
					reducedDelta[deltaKey] = delta[reducedDelta]
				}
			})

			return this.$axios.$patch(`/api/${resource}/${key}`, delta).then((data) => {
				commit('STAGE', data)
				return data
			})
		},
		delete({commit}, entity) {

		},
	}, actions)

	return {
		namespaced: true,
		state: moduleState,
		getters: moduleGetters,
		mutations: moduleMutations,
		actions: moduleActions,
	}
}
