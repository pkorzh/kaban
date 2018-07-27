<template>
	<div>
		<NewTicketForm v-on:newItem="newItem" />

		<Backlog
			:backlog="backlog"
			:tickets="tickets" />
	</div>
</template>

<script>
	import Backlog from '@/components/Backlog';
	import NewTicketForm from '@/components/NewTicketForm';
	import { mapGetters, mapActions } from 'vuex';

	export default {
		components: {
			Backlog,
			NewTicketForm
		},
		computed: {
			...mapGetters('backlogs', {
				getBacklog: 'getOne'
			}),

			...mapGetters('tickets', {
				queryTicket: 'query'
			}),

			backlog() {
				return this.getBacklog(this.$route.params.key)
			},

			tickets() {
				return this.queryTicket(
					(ticket) => ticket.backlog.key === this.backlog.key)
			}
		},
		methods: {
			...mapActions('tickets', [
				'createTicket'
			]),

			newItem(name) {
				const ticketCreateSlim = {
					name,
					backlog: {
						key: this.backlog.key
					}
				}

				this.createTicket(ticketCreateSlim)
			}
		}
	}
</script>
