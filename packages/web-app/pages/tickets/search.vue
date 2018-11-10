<template>
	<b-container fluid>
		<TopBar>
			<template slot="header">
				<span v-t="'search'"></span>
			</template>

			<template slot="breadcrumb">
				<b-breadcrumb>
					<b-breadcrumb-item
							:to="localePath({name: 'issues-search'})"
							text="Tickets"
							active/>
				</b-breadcrumb>
			</template>

			<ActionsNav>
			</ActionsNav>
		</TopBar>

		<tql-search placeholder="Enter search query"
					:value="tql"
					@input="search">
			<template slot-scope="{ fields }">
				<b-row>
					<b-col>
						<tql-search-text
								name="name"
								v-model="fields.name"
								placeholder="Ticket summary"/>

						<tql-search-key
								name="backlog"
								v-model="fields.backlog"
								getter="backlogs/getList"/>

						<tql-search-key
								name="type"
								v-model="fields.type"
								getter="tickettypes/getList"/>

						<tql-search-key
								name="status"
								v-model="fields.status"
								getter="status/getList"/>
					</b-col>
					<b-col>
						<tql-search-key
								name="priority"
								v-model="fields.priority"
								getter="priorities/getList"/>

						<tql-search-key
								name="resolution"
								v-model="fields.resolution"
								getter="resolutions/getList"/>

						<tql-search-key
								name="assignee"
								icon="avatar"
								v-model="fields.assignee"
								getter="users/getList"/>
					</b-col>
				</b-row>
			</template>
		</tql-search>

		<InfiniteScroll
				:list="tickets"
				@loadmore="loadMore"
				item-selector="tbody tr">
			<TicketsTable
					:tickets="tickets"/>
		</InfiniteScroll>
	</b-container>
</template>

<script>
	import {mapGetters, mapActions} from 'vuex';

	export default {
		async fetch({store, params, route: {query}}) {
			let tql = query.tql || null

			await store.dispatch('tickets/fetchList', {
				limit: 20,
				tql,
			})
		},
		async asyncData({route: {query}}) {
			return {
				tql: query.tql || '',
			}
		},
		head() {
			return {
				title: this.$t('searchTickets'),
			}
		},
		methods: {
			...mapActions('tickets', {
				fetchTickets: 'fetchList',
				fetchMoreTickets: 'fetchMore',
			}),

			search(tql) {
				this.$router.push(this.localePath({
					name: 'tickets-search',
					query: {tql},
				}))
			},

			async loadMore(amount) {
				const lastTicketRank = this.tickets[this.tickets.length - 1].rank

				await this.fetchMoreTickets({
					tql: `${this.tql ? this.tql + ' and ' : ''}rank > "${lastTicketRank}"`,
					limit: amount,
				})
			},
		},
		computed: {
			...mapGetters('tickets', {
				tickets: 'getList',
			}),
		},
		watch: {
			'$route.query.tql'(tql) {
				this.tql = tql
				this.fetchTickets({tql, limit: 20})
			},
		},
	}
</script>
