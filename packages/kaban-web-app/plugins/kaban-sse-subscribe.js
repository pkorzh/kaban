
export default ({ app, store }, inject) => {
	app.$sse().then(sse => {
		sse.subscribe('createTicket', data => {
			store.commit('tickets/STAGE', data)
		})

		sse.subscribe('createBoard', data => {
			store.commit('boards/STAGE', data)
		})

		sse.subscribe('createBacklog', data => {
			store.commit('backlogs/STAGE', data)
		})
	})
}
