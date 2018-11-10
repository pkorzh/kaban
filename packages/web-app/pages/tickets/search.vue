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

		<tql-search class="mb-3"
					placeholder="Enter search query"
					:fields="searchFields"
					@input="search">

			<b-row>
				<b-col>
					<tql-search-text
							name="name"
							v-model="searchFields.name"
							placeholder="Ticket summary"/>

					<tql-search-key
							name="backlog"
							v-model="searchFields.backlog"
							getter="backlogs/getList"/>

					<tql-search-key
							name="type"
							v-model="searchFields.type"
							getter="tickettypes/getList"/>
				</b-col>
				<b-col>
					<tql-search-key
							name="priority"
							v-model="searchFields.priority"
							getter="priorities/getList"/>

					<tql-search-key
							name="resolution"
							v-model="searchFields.resolution"
							getter="resolutions/getList"/>

					<tql-search-key
							name="assignee"
							icon="avatar"
							v-model="searchFields.assignee"
							getter="users/getList"/>
				</b-col>
			</b-row>
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
	import {mapGetters, mapActions} from 'vuex'
	import TqlSearchKey from '../../components/TqlSearch/TqlSearchKey'

	export default {
		components: {TqlSearchKey},
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

		data() {
			return {
				searchFields: {
					backlog: '',
					type: '',
					name: '',
					priority: '',
					resolution: '',
					assignee: '',
				},
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
