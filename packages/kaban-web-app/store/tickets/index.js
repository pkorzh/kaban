import Vue from 'Vue'
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
		updateTicketStatus({commit}, {tickets, mapsTo}) {
			commit('UPDATE_TICKETS_STATUS', {tickets, mapsTo})
		}
	}
});
