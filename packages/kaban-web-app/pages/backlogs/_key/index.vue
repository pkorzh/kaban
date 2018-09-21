<template>
	<b-container fluid>
		<TopBar>
			<template slot="header">
				{{ backlog.name }}
			</template>

			<template slot="breadcrumb">
				<b-breadcrumb>
					<b-breadcrumb-item :to="localePath({name: 'backlogs'})" text="Backlogs" />
				</b-breadcrumb>
			</template>

			<ActionsNav>
				<!--<ActionsNavAssigned />
				<ActionsNavQuickFilters />

				<ActionsNavSimpleSearch />-->

				<ActionsNavButton
					text="Create Ticket"
					action="CreateTicketAction" />

				<div class="actions-nav-separator"></div>

				<b-dropdown variant="light" right no-caret>
					<template slot="button-content">
						<font-awesome-icon icon="cog" />
					</template>
					<b-dropdown-item :to="localePath({name: 'backlogs-key-reports-forecast', params: {key: backlog.key}})">
						Reports
					</b-dropdown-item>
					<b-dropdown-item
						:to="localePath({name: 'backlogs-key-configure-general', params: { key: backlog.key }})">
						Configure
					</b-dropdown-item>
					<b-dropdown-item>
						Archive
					</b-dropdown-item>
					<b-dropdown-divider />
					<b-dropdown-item-button class="text-danger" @click="deleteBacklog(backlog.key)">
						Delete
					</b-dropdown-item-button>
				</b-dropdown>
			</ActionsNav>
		</TopBar>

		<TicketsList
			:tickets="tickets"
			@loadmore="loadMore"/>
	</b-container>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';

	export default {
		async fetch({store, params, error}) {
			await store.dispatch('tickets/fetchList', {
				tql: `backlog = ${params.key}`,
				limit: 10
			})
		},
		head() {
			return {
				title: this.backlog.name
			}
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
				'createTicket',
				'fetchMore'
			]),
			async loadMore(amount) {
				const lastTicketCreatedAt = this.tickets[this.tickets.length - 1].createdAt

				await this.fetchMore({
					tql: `backlog = ${this.backlog.key} and createdAt > "${lastTicketCreatedAt}"`,
					limit: amount
				})
			},
			deleteBacklog(key) {
				this.$kaban.dispatch('DeleteBacklogAction', {
					sender: this,
					payload: {
						backlogKey: key
					}
				})
			}
		}
	}
</script>
