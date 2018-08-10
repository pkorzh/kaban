import Vue from 'vue'
import Vuex from 'vuex'

import backlogs from './backlogs'
import boards from './boards'
import tickets from './tickets'
import users from './users'
import tickettypes from './tickettypes'
import priorities from './priorities'

Vue.use(Vuex)

const store = () => new Vuex.Store({
	modules: {
		backlogs,
		boards,
		tickets,
		users,
		tickettypes,
		priorities,
	},
	actions: {
		async nuxtServerInit({dispatch}) {
			return Promise.all([
				dispatch('boards/fetchList'),
				dispatch('backlogs/fetchList'),
			])
		}
	}
})

export default store
