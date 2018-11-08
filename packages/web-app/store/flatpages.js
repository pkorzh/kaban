import Vue from 'vue';
import moduleFactory from './module-factory';

export default moduleFactory('flatpages', {
	state: {
		latestEntities: {}
	},
	mutations: {
		STAGE_LATEST_MULTIPLE(state, multiple) {
			multiple.forEach(payload =>
				Vue.set(state.latestEntities, payload.key, payload))
		},
		EMPTY_LATEST(state) {
			state.latestEntities = {}
		},
	},
	getters: {
		getLatest(state) {
			return Object.keys(state.latestEntities).map(key => 
				state.latestEntities[key]);
		}
	},
	actions: {
		async getContent({commit, getters}, key) {
			const rawEntity = await this.$axios.$get(`/api/flatpages/content/${key}`)
			return rawEntity.content
		},
		async fetchLatest({commit}) {
			commit('SET_WORKING', true)

			const rawList = await this.$axios.$get(
				`/api/flatpages/`,
				{
					params: {
						tql: 'updatedAt >= yesterday',
						limit: 3,
					}
				},
			)

			commit('EMPTY_LATEST')
			commit('STAGE_LATEST_MULTIPLE', rawList)
			commit('SET_WORKING', false)

			return rawList
		},
	}
})
