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
						text="Issues"
						active />
				</b-breadcrumb>
			</template>

			<ActionsNav>
			</ActionsNav>
		</TopBar>

		<b-form class="mb-3" @submit.prevent.stop="search">
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

		<TicketsTable
			:tickets="tickets" />
	</b-container>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';

	export default {
		async fetch({store, params}) {
			await store.dispatch('tickets/fetchList')
		},

		head() {
			return {
				title: 'Search Tickets'
			}
		},

		data() {
			return {
				tql: ''
			}
		},

		methods: {
			...mapActions('tickets', {
				fetchTickets: 'fetchList'
			}),

			search() {
				this.fetchTickets(this.tql)
			}
		},

		computed: {
			...mapGetters('tickets', {
				tickets: 'getList',
			})
		},
	}
</script>
