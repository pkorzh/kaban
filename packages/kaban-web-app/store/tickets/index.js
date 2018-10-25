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
		},
		UPDATE_TICKETS_POSITION(state, {keys, newRank}) {
			keys.forEach(key => Vue.set(state.entities[key], 'rank', newRank))
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
		async rank({commit, getters: {getOne}}, {keys, after, before, estimatedRank}) {
			let old = [];

			for (let i = keys.length - 1; i >= 0; i--) {
				old.push({
					key: keys[i],
					rank: getOne(keys[i]).rank,
				});
			}

			commit('UPDATE_TICKETS_POSITION', {keys, newRank: estimatedRank});

			try {
				const rank = await this.$axios.$post(`/api/rank/`, {keys, after, before});
				commit('UPDATE_TICKETS_POSITION', {keys, newRank: rank.newRank});
			} catch(e) {
				for(let item of old) {
					commit('UPDATE_TICKETS_POSITION', {
						keys: [item.key], 
						newRank: item.rank,
					});
				}
			}
		}
	}
})
