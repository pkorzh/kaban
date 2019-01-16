import { mapActions } from 'vuex';

import { predicate } from '../../tql';

export default {
	props: {
		status: {
			type: String,
			required: false
		},
		backlog: {
			type: Object,
			required: false,
		},
		type: {
			type: Object,
			required: false,
		},
		stageIfTQLMatch: {
			type: String,
			required: false,
		},
	},
	data() {
		return {
			ticket: {
				reporter: this.$auth.user,
			}
		}
	},
	methods: {
		...mapActions('tickets', {
			createTicket: 'create',
			stageTicket: 'stage'
		}),

		async create() {
			const valid = await this.$validator.validateAll();
			if (!valid) return;

			const ticket = await this.createTicket({
				entity: { ...this.ticket, type: this.type, backlog: this.backlog },
				stage: false,
			});

			const stage = this.stageIfTQLMatch
				? predicate(this.stageIfTQLMatch)(ticket)
				: true;

			if (stage) {
				this.stageTicket(ticket);
			}

			this.$emit('close');
		},
	}
}