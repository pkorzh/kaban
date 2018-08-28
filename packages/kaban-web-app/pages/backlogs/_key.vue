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
				<!--<ActionsNavAssigned />
				<ActionsNavQuickFilters />-->

				<!--<ActionsNavSimpleSearch />-->

				<ActionsNavColumns
					:fields="originalTicketFields"
					@columns="applyColumns" />

				<ActionsNavButton
					text="Create Ticket"
					action="CreateTicketAction" />
			</ActionsNav>
		</TopBar>

		<TicketsTable
			:tickets="tickets"
			:fields="ticketFields" />
	</b-container>
</template>

<script>
	import TicketsTableBaseMixin from '@/mixins/TicketsTableBaseMixin';
	import { mapGetters, mapActions } from 'vuex';

	export default {
		mixins: [TicketsTableBaseMixin],
		async fetch({store, params}) {
			await store.dispatch('tickets/fetchList', `backlog = ${params.key}`)
		},
		computed: {
			...mapGetters('backlogs', {
				getBacklog: 'getOne'
			}),

			...mapGetters('tickets', {
				tickets: 'getList'
			}),

			backlog() {
				return this.getBacklog(this.$route.params.key)
			},
		},
		methods: {
			...mapActions('tickets', [
				'createTicket'
			]),
		}
	}
</script>
