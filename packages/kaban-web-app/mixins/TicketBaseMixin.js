export default {
	methods: {
		highlight(ticket) {
			this.$kaban.dispatch('HighlightTicketAction', {
				payload: {
					ticketKey: ticket.key,
					backlogKey: ticket.backlog.key,
				},
				sender: this,
			})
		},
		ticketUrl(ticket) {
			return `/issues/${ticket.key}`
		}
	}
}
