import Vue from 'Vue'

import moduleFactory from '../module-factory'

export default moduleFactory({
	state: {
		entities: {
			'cca-1': {
				id: 1,
				name: 'As a user i want to see my settings',
				key: 'cca-1',
				status: {
					key: 'todo'
				},
				backlog: {
					key: 'create-aws-api'
				}
			},
			'cca-2': {
				id: 2,
				name: 'As a user i want to be able to logout',
				key: 'cca-2',
				status: {
					key: 'doneProgress',
				},
				backlog: {
					key: 'create-aws-api'
				}
			}
		}
	},
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
		},
		createTicket({commit, state}, {name, backlog}) {
			const key = `cca-${state.list.length + 1}`;

			const ticket = {
				id: state.list.length + 1,
				name,
				key,
				status: 'todo',
				backlog
			}

			commit('CREATE', ticket)
		}
	}
});
