import Vue from 'vue'
import shortid from 'shortid'

export default (
		resource,
		{state, getters, actions, mutations, modules = {}, patchReducers = {}, local = false}
	) => {
	const moduleState = () => (Object.assign({
		entities: {},
	}, state))

	const moduleGetters = Object.assign({
		getList(state) {
			return Object.keys(state.entities).map(key => state.entities[key]);
		},
		getOne(state) {
			return key => {
				const e = state.entities[key]
				return e
			};
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
		REMOVE(state, payload) {
			Vue.delete(state.entities, payload)
		},
		STAGE(state, payload) {
			Vue.set(state.entities, payload.key, payload)
		},
		STAGE_MULTIPLE(state, multiple) {
			multiple.forEach(payload =>
				moduleMutations.STAGE(state, payload))
		}
	}, mutations)

	let moduleActions

	if (local) {
		moduleActions = Object.assign({
			create({commit}, entity) {
						if (!entity.key) {
							entity.key = shortid.generate()
						}

						commit('STAGE', entity)

						return Promise.resolve(entity)
			},
			patch({commit}, {delta}) {
					commit('STAGE', delta)

					return Promise.resolve(delta)
			},
			delete({commit}, {key}) {
				commit('REMOVE', key)

				return Promise.resolve()
			},
		}, actions)
	} else {
		moduleActions = Object.assign({
			async fetchList({commit, getters}, payload) {
				const rawList = await this.$axios.$get(
					`/api/${resource}/`,
					{ params: payload },
				)

				commit('EMPTY')
				commit('STAGE_MULTIPLE', rawList)

				return rawList
			},
			async fetchMore({commit, getters}, payload) {
				const rawList = await this.$axios.$get(
					`/api/${resource}/`,
					{ params: payload },
				)

				commit('STAGE_MULTIPLE', rawList)

				return rawList
			},
			async fetchOne({commit, getters}, tql) {
				const rawEntity = await this.$axios.$get(`/api/${resource}/`, { params: { tql } })
				commit('STAGE', rawEntity[0])
				return rawEntity[0]
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
			delete({commit}, {key, migrateTo}) {
				this.$axios.$delete(`/api/${resource}/${key}`, {
					params: { migrateTo }
				}).then(() => {
					commit('REMOVE', key)
				})
			},
		}, actions)
	}

	return {
		namespaced: true,
		state: moduleState,
		getters: moduleGetters,
		mutations: moduleMutations,
		actions: moduleActions,
		modules,
	}
}
