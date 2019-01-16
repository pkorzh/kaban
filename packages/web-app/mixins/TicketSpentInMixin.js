export default {
	methods: {
		spentInDays(ticket) {
			const days = (new Date() - new Date(ticket.lastTransitionAt)) / 8.64e+7;
			return Math.floor(days);
		},

		spentInText(ticket) {
			const days = this.spentInDays(ticket);

			if (days < 1) {
				return `Less than a day in this status`;
			}

			return `${days} days in this status`;
		},

		spentInClass(ticket) {
			const days = this.spentInDays(ticket);

			if (days < 1) {
				return 'ticket-estm ticket-estm-0';
			} else if (days >= 1 && days <= 2) {
				return `ticket-estm ticket-estm-${days}`;
			} else {
				return 'ticket-estm ticket-estm-alot';
			}
		},
	}
}
