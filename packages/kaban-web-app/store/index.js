import Vue from 'vue'
import Vuex from 'vuex'

import backlogs from './backlogs'
import boards from './boards'
import tickets from './tickets'
import users from './users'
import tickettypes from './tickettypes'
import priorities from './priorities'
import workflow from './workflow'

Vue.use(Vuex)

const store = () => new Vuex.Store({
	modules: {
		backlogs,
		boards,
		tickets,
		users,
		tickettypes,
		priorities,
		workflow,
	},
	actions: {
		async nuxtServerInit({dispatch}) {
			return Promise.all([
				dispatch('boards/fetchList'),
				dispatch('backlogs/fetchList'),
				dispatch('workflow/fetchTransitions')
			])
		}
	}
})

export default store
