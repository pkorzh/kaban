<template>
	<b-container fluid>
		<TopBar>
			<template slot="header">
				{{ backlog.name }}
			</template>

			<ActionsNav>
				<ActionsNavButton
					text="Add"
					action="CreateTicketAction"
					shortkey="c" />

				<ActionsNavAssigned />
				<ActionsNavQuickFilters />
				<ActionsNavSimpleSearch />
			</ActionsNav>
		</TopBar>

		<TicketsTable :tickets="tickets" />
	</b-container>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';

	export default {
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
		}
	}
</script>
