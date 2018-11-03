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
						active />
				</b-breadcrumb>
			</template>

			<ActionsNav>
			</ActionsNav>
		</TopBar>

		<b-form class="mb-3" @submit.prevent.stop="search(tql)">
			<div class="input-group">
				<div class="input-group-prepend">
					<span class="input-group-text">
						<font-awesome-icon icon="search" />
					</span>
				</div>

				<b-form-input
					type="text"
					size="lg"
					v-model="tql"
					placeholder="Enter search query" />
			</div>
		</b-form>

		<InfiniteScroll
				:list="tickets"
				@loadmore="loadMore"
				item-selector="tbody tr">
			<TicketsTable
					:tickets="tickets" />
		</InfiniteScroll>
	</b-container>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';

	export default {
		async fetch({store, params, route: {query}}) {
			let tql = query.tql || null;

			await store.dispatch('tickets/fetchList', {
				limit: 20,
				tql,
			})
		},

		async asyncData({route: {query}}) {
			return {
				tql: query.tql || '', 
			};
		},

		head() {
			return {
				title: this.$t('searchTickets')
			}
		},

		data() {
			return {
				tql: ''
			}
		},

		methods: {
			...mapActions('tickets', {
				fetchTickets: 'fetchList',
				fetchMoreTickets: 'fetchMore'
			}),

			search(tql) {
				this.$router.push(this.localePath({
					name: 'tickets-search',
					query: { tql },
				}));
			},

			async loadMore(amount) {
				const lastTicketRank = this.tickets[this.tickets.length - 1].rank

				await this.fetchMoreTickets({
					tql: `${this.tql ? this.tql + ' and ' : ''}rank > "${lastTicketRank}"`,
					limit: amount
				})
			}
		},

		computed: {
			...mapGetters('tickets', {
				tickets: 'getList',
			})
		},

		watch: {
			'$route.query.tql'(tql) {
				this.tql = tql;
				this.fetchTickets({ tql, limit: 20 });
			}
		},
	}
</script>
