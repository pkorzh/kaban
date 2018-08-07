export default {
	methods: {
		highlight(ticket, backlog) {
			this.$kaban.dispatch('HighlightTicketAction', {
				payload: {ticket, backlog},
				sender: this,
			})
		},
		ticketUrl(ticket) {
			return `/issues/${ticket.key}`
		}
	}
}
