import Vue from 'vue'

import moduleFactory from '../module-factory'

export default moduleFactory('workflow', {
	state: {
		transitions: {}
	},
	mutations: {
		STAGE_TRANSITIONS(state, payload) {
			Object.keys(payload).forEach(status =>
				Vue.set(state.transitions, status, payload[status]))
		}
	},
	actions: {
		async fetchTransitions({commit}) {
			const rawList = await this.$axios.$get(`/api/workflow/transition`)
			commit('STAGE_TRANSITIONS', rawList)
		}
	},
	getters: {
		allowedTransitions(state) {
			return ({key}) => state.transitions[key]
		}
	}
})
