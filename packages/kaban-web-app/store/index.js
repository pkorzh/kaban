import Vue from 'vue'
import Vuex from 'vuex'

import backlogs from './backlogs'
import boards from './boards'
import tickets from './tickets'

Vue.use(Vuex)

const store = () => new Vuex.Store({
	modules: {
		backlogs,
		boards,
		tickets,
	},
	actions: {
		nuxtServerInit({commit}) {
			const issues = require('../../kaban-importer-jira/issues.json')
			commit('tickets/CREATE_MULTIPLE', issues)
		}
	}
})

export default store
