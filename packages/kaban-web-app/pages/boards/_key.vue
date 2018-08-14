<template>
	<b-container fluid>
		<TopBar>
			<template slot="header">
				{{ board.name }}
			</template>

			<template slot="breadcrumb">
				<b-breadcrumb>
					<b-breadcrumb-item :to="{name: 'boards'}" text="Boards" />
				</b-breadcrumb>
			</template>

			<ActionsNav>
				<!--<ActionsNavAssigned />
				<ActionsNavQuickFilters />-->

				<ActionsNavLink
					text="Goto Backlog"
					:to="{name: 'backlogs-key', params: {key: board.backlog.key}}" />

				<!--<ActionsNavSimpleSearch />-->

				<ActionsNavButton
					text="Create Ticket"
					action="CreateTicketAction"
					shortkey="c" />

				<ActionsNavBoardViewSwitcher v-model="boardView" />
			</ActionsNav>
		</TopBar>

		<Board
			v-if="boardView"
			:board="board"
			:tickets="tickets" />

		<TicketsTable
			v-if="!boardView"
			:tickets="tickets" />
	</b-container>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';

	export default {
		data() {
			return {
				boardView: true
			}
		},
		async fetch({store, params}) {
			await store.dispatch('boards/fetchOne', params.key)

			const board = store.getters['boards/getOne'](params.key)

			await store.dispatch('tickets/fetchList', {
				backlog: board.backlog.key
			})
		},
		computed: {
			...mapGetters('boards', {
				getBoard: 'getOne'
			}),

			...mapGetters('tickets', {
				queryTicket: 'queryList',
			}),

			board() {
				return this.getBoard(this.$route.params.key)
			},

			tickets() {
				return this.queryTicket(
					(ticket) => ticket.backlog.key === this.board.backlog.key)
			},
		},
		methods: {
			...mapActions('tickets', [
				'updateTicketStatus'
			]),
		},
		async mounted() {
			this.$bus.$on('kaban::board::draggables', ({tickets, mapsTo}) => {
				this.updateTicketStatus({tickets, mapsTo})
			})
		},
		beforeDestroy() {
			this.$bus.$off('kaban::board::draggables')
			this.$bus.$off('kaban::board::ticket::selected')
		}
	}
</script>
