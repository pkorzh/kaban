import Vue from 'Vue'
import { utc } from 'moment'

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
				},
				type: {
					name: 'Story',
					iconUrl: '/tickettypes/story.svg',
				},
				tags: [
					{
						name: 'P8'
					}
				],
				createdAt: utc(new Date().toISOString()),
				updatedAt: utc(new Date().toISOString()),
				resolvedAt: utc(new Date().toISOString()),
				description: '',
				assignee: {
					id: 1,
					key: 'platon.korzh',
					name: 'Platon Korzh',
					email: 'platon@korzh.io',
					avatar: 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png',
					active: true,
				},
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
				},
				type: {
					name: 'Story',
					iconUrl: '/tickettypes/story.svg',
				},
				createdAt: utc(new Date().toISOString()),
				updatedAt: utc(new Date().toISOString()),
				resolvedAt: utc(new Date().toISOString()),
				description: '',
				assignee: {
					id: 1,
					key: 'platon.korzh',
					name: 'Platon Korzh',
					email: 'platon@korzh.io',
					avatar: 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png',
					active: true,
				},
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
