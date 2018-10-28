import Vue from 'vue'

import moduleFactory from '../module-factory'

import comments from './comments'
import history from './history'

export default moduleFactory('tickets', {
	modules: {
		comments,
		history,
	},
	mutations: {
		UPDATE_TICKETS_STATUS(state, {keys, mapsTo}) {
			keys.forEach(key => Vue.set(state.entities[key], 'status', mapsTo))
		}
	},
	actions: {
		transition({commit}, {tickets, mapsTo}) {
			const keys = tickets.map(ticket => ticket.key)

			const oldMapsTo = JSON.parse(
				JSON.stringify(tickets[0].status)
			)

			commit('UPDATE_TICKETS_STATUS', {keys, mapsTo})

			return this.$axios.$post(`/api/workflow/transition/`, {keys, mapsTo: mapsTo.key}).then((data) => {
				return data
			}, (error => {
				commit('UPDATE_TICKETS_STATUS', {keys, mapsTo: oldMapsTo})
			}))
		}
	}
})
