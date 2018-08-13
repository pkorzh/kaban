export default {
	methods: {
		highlight(ticket, backlog) {
			this.$kaban.dispatch('HighlightTicketAction', {
				payload: {
					ticketKey: ticket.key,
					backlogKey: backlog.key,
				},
				sender: this,
			})
		},
		ticketUrl(ticket) {
			return `/issues/${ticket.key}`
		}
	}
}
