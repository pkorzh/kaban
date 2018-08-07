<template>
	<b-container fluid>
		<TopBar>
			<template slot="header">
				{{ backlog.name }}
			</template>

			<template slot="breadcrumb">
				<b-breadcrumb>
					<b-breadcrumb-item :to="{name: 'backlogs'}" text="Backlogs" />
				</b-breadcrumb>
			</template>

			<ActionsNav>
				<ActionsNavAssigned />
				<ActionsNavQuickFilters />

				<ActionsNavSimpleSearch />

				<ActionsNavButton
					text="Add"
					action="CreateTicketAction"
					shortkey="c" />
			</ActionsNav>
		</TopBar>

		<TicketsTable :tickets="tickets" />
	</b-container>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';

	export default {
		async fetch({store, params}) {
			await store.dispatch('backlogs/fetchOne', params.key)

			await store.dispatch('tickets/fetchList', {
				backlog: params.key
			})
		},
		computed: {
			...mapGetters('backlogs', {
				getBacklog: 'getOne'
			}),

			...mapGetters('tickets', {
				queryTicket: 'queryList'
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
