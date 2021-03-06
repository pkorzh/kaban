import Vue from 'vue';
import shortid from 'shortid';

import { predicate } from '../tql';

export default (
		resource,
		{state, getters, actions, mutations, modules = {}, patchReducers = {}}
	) => {

	const moduleState = () => (Object.assign({
		entities: {},
		working: false,
	}, state));

	const moduleGetters = Object.assign({
		getList(state) {
			return Object.keys(state.entities).map(key => state.entities[key]);
		},
		queryList(state) {
			return tqlOrFn => {
				let filterFn = (entity) => true;

				if (typeof tqlOrFn === 'string' && tqlOrFn.length) {
					filterFn = predicate(tqlOrFn);
				} else if (typeof tqlOrFn === 'function') {
					filterFn = tqlOrFn;
				}

				return Object.keys(state.entities).map(key => state.entities[key])
					.filter(filterFn);
			};
		},
		getOne(state) {
			return key => {
				const e = state.entities[key]
				return e
			};
		},
		working(state) {
			return state.working
		}
	}, getters);

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
		},
		SET_WORKING(state, working) {
			Vue.set(state, 'working', working)
		}
	}, mutations);

	let moduleActions = Object.assign({
		async fetchList({commit, getters}, payload) {
			commit('SET_WORKING', true)

			const doNotEmpty = payload && payload.empty === false;

			const rawList = await this.$axios.$get(
				`/api/${resource}/`,
				{ params: payload },
			)

			if (!doNotEmpty) {
				commit('EMPTY');
			}

			commit('STAGE_MULTIPLE', rawList);
			commit('SET_WORKING', false);

			return rawList;
		},
		async fetchMore({commit, getters}, payload) {
			commit('SET_WORKING', true)

			const rawList = await this.$axios.$get(
				`/api/${resource}/`,
				{ params: payload },
			)

			commit('STAGE_MULTIPLE', rawList)
			commit('SET_WORKING', false)

			return rawList
		},
		async fetchOne({commit, getters}, tql) {
			commit('SET_WORKING', true)

			const rawEntity = await this.$axios.$get(`/api/${resource}/`, { params: { tql } })

			commit('STAGE', rawEntity[0])
			commit('SET_WORKING', false)

			return rawEntity[0]
		},
		create({commit}, payload) {
			let { entity, stage } = payload;

			if (!entity) {
				entity = payload;
				stage = true;
			}

			commit('SET_WORKING', true)

			return this.$axios.$post(`/api/${resource}/`, entity).then((data) => {
				stage && commit('STAGE', data);
				commit('SET_WORKING', false);

				return data;
			})
		},
		patch({commit, dispatch}, {delta, key}) {
			commit('SET_WORKING', true)

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
				commit('SET_WORKING', false)

				return data
			})
		},
		async delete({commit}, {key, migrateTo}) {
			commit('SET_WORKING', true)

			await this.$axios.$delete(`/api/${resource}/${key}`, {
				params: { migrateTo }
			})

			commit('REMOVE', key)
			commit('SET_WORKING', false)
		},
		empty({commit}) {
			commit('EMPTY')
		},
		stage({commit}, entity) {
			commit('STAGE', entity);
		}
	}, actions);

	return {
		namespaced: true,
		state: moduleState,
		getters: moduleGetters,
		mutations: moduleMutations,
		actions: moduleActions,
		modules,
	};
}
