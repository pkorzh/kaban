export default {
	methods: {
		highlight(ticket) {
			this.$kaban.dispatch('HighlightTicketAction', {
				payload: ticket,
				sender: this,
			})
		},
		ticketUrl(ticket) {
			return `/issues/${ticket.key}`
		}
	}
}
