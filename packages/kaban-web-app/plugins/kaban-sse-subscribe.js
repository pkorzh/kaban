
export default ({ app, store }, inject) => {
	app.$sse().then(sse => {
		sse.subscribe('createTicket', data => {
			console.warn('Received a message w/o an event!', data);
		})
	})
}
