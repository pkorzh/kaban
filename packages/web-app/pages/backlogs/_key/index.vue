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
					shortkey="c"
					:disabled="backlog.isArchived"
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
					<b-dropdown-item @click="toggleBacklogIsArchive(backlog)">
						{{backlog.isArchived ? 'Unarchive' : 'Archive'}}
					</b-dropdown-item>
					<b-dropdown-divider />
					<b-dropdown-item-button class="text-danger" @click="deleteBacklog(backlog.key)">
						Delete
					</b-dropdown-item-button>
				</b-dropdown>
			</ActionsNav>
		</TopBar>

		<InfiniteScroll
				@loadmore="loadMore"
				:list="tickets"
				item-selector=".table-list-line">
			<TicketsList
					:tickets="tickets"/>
		</InfiniteScroll>
	</b-container>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';

	export default {
		async fetch({store, params, error}) {
			await store.dispatch('tickets/fetchList', {
				tql: `backlog = ${params.key}`,
				limit: 20
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
			...mapActions('backlogs', {
				patchBacklog: 'patch'
			}),
			async loadMore(amount) {
				const lastTicketRank = this.tickets[this.tickets.length - 1].rank

				await this.fetchMore({
					tql: `backlog = ${this.backlog.key} and rank > "${lastTicketRank}"`,
					limit: amount
				})
			},
			deleteBacklog(key) {
				this.$kaban.dispatch('DeleteBacklogAction', {
					sender: this,
					payload: {
						backlogKey: key,
						goBack: 'backlogs'
					}
				})
			},
			toggleBacklogIsArchive(backlog) {
				this.patchBacklog({
					key: backlog.key,
					delta: {
						isArchived: !backlog.isArchived
					}
				})
			}
		}
	}
</script>
