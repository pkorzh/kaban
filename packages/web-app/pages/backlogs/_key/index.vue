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
				<ActionsNavButton
					text="Create Ticket"
					shortkey="c"
					:disabled="backlog.isArchived"
					:payload="{backlog: backlog, stageIfTQLMatch: `backlog = ${backlog.key}`}"
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

	const basetql = (key) => `backlog = ${key} and status != closed`;

	export default {
		fetch({store, params, route: {query}}) {
			let tql = basetql(params.key);

			return store.dispatch('tickets/fetchList', {
				tql,
				limit: 20,
			});
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
				'fetchMore',
				'fetchList',
			]),

			...mapActions('backlogs', {
				patchBacklog: 'patch'
			}),

			async loadMore(amount) {
				if (!this.tickets.length) {
					return;
				}

				const lastTicketRank = this.tickets[this.tickets.length - 1].rank;
				let tqlBase =basetql(this.backlog.key);

				await this.fetchMore({
					tql: `${tqlBase} and rank > "${lastTicketRank}"`,
					limit: amount,
					more: true,
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
			},
		},
	}
</script>
