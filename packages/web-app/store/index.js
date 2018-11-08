import Vue from 'vue'
import Vuex from 'vuex'

import backlogs from './backlogs'
import boards from './boards'
import tickets from './tickets'
import users from './users'
import tickettypes from './tickettypes'
import priorities from './priorities'
import workflow from './workflow'
import status from './status'
import flatpages from './flatpages'
import errors from './errors'
import resolutions from './resolutions'
import kabanConfiguration from './kaban-configuration'

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
		status,
		flatpages,
		errors,
		resolutions,
		kabanConfiguration,
	},
	actions: {
		async nuxtServerInit({dispatch, state}) {
			if (state.auth.loggedIn) {
				return Promise.all([
					dispatch('boards/fetchList'),
					dispatch('backlogs/fetchList'),
					dispatch('workflow/fetchTransitions'),
					dispatch('status/fetchList'),
					dispatch('users/fetchList'),
					dispatch('kabanConfiguration/fetchStatus'),
					dispatch('flatpages/fetchLatest'),
				])
			} else {
				return Promise.resolve()
			}
		}
	}
})

export default store
