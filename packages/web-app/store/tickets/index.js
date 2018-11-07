import Vue from 'vue'

import moduleFactory from '../module-factory'

import comments from './comments'
import history from './history'
import attachments from './attachments'

export default moduleFactory('tickets', {
	modules: {
		comments,
		history,
		attachments,
	},
	mutations: {
		UPDATE_TICKETS_STATUS(state, {keys, mapsTo}) {
			keys.forEach(key => Vue.set(state.entities[key], 'status', mapsTo));
		},
		UPDATE_TICKETS_POSITION(state, rankChanges) {
			rankChanges.forEach(rankChange => 
				Vue.set(state.entities[rankChange.key], 'rank', rankChange.rank));
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
		},
		async rank({commit, getters: {getOne}}, {keys, before, after}) {
			const rankChanges = await this.$axios.$post(
				`/api/rank`, 
				{keys, before, after}
			);

			commit('UPDATE_TICKETS_POSITION', rankChanges);
		},
		move({commit}, changeset) {
			return this.$axios.$post(
				`/api/tickets/move`, 
				changeset,
			);
		}
	}
})
