import Vue from 'vue'
import { utc } from 'moment'

import moduleFactory from '../module-factory'

export default moduleFactory('tickets', {
	mutations: {
		UPDATE_TICKETS_STATUS(state, {tickets, mapsTo}) {
			tickets.forEach(ticket => {
				if (ticket.status.key !== mapsTo.key) {
					Vue.set(ticket, 'status', mapsTo)
				}
			})
		}
	},
	actions: {
		transition({commit}, {tickets, mapsTo}) {
			commit('UPDATE_TICKETS_STATUS', {tickets, mapsTo})
		}
	}
})
