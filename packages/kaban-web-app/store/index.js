import Vue from 'vue'
import Vuex from 'vuex'

import { utc } from 'moment'

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
			let issues = require('../../kaban-importer-jira/issues.json').map(issue => {
				return {
					...issue,
					createdAt: utc(issue.createdAt),
					updatedAt: utc(issue.updatedAt),
					resolvedAt: utc(issue.resolvedAt),
				}
			})

			commit('tickets/CREATE_MULTIPLE', issues)
		}
	}
})

export default store
