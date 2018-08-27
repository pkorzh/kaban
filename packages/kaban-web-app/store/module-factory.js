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
		EMPTY(state) {
			state.entities = {}
		},
		STAGE(state, payload) {
			Vue.set(state.entities, payload.key, payload)
		},
		STAGE_MULTIPLE(state, multiple) {
			multiple.forEach(payload =>
				moduleMutations.STAGE(state, payload))
		}
	}, mutations)

	const moduleActions = Object.assign({
		async fetchList({commit, getters}, tql) {
			const rawList = await this.$axios.$get(
				`http://127.0.0.1:3000/api/${resource}/`,
				{ params: { tql } },
			)

			commit('EMPTY')
			commit('STAGE_MULTIPLE', rawList)
			return rawList
		},

		async fetchOne({commit}, getters) {
			const rawEntity = await this.$axios.$get(`http://127.0.0.1:3000/api/${resource}/`, { params: { tql } })
			commit('STAGE', rawEntity[0])
			return rawEntity[0]
		},
		create({commit}, entity) {
			return this.$axios.$post(`http://127.0.0.1:3000/api/${resource}/`, entity).then((data) => {
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

			return this.$axios.$patch(`http://127.0.0.1:3000/api/${resource}/${key}`, delta).then((data) => {
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