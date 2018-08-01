<template>
	<b-container fluid>
		<TopBar>
			<template slot="header">
				{{ board.name }}
			</template>

			<ActionsNav>
				<ActionsNavAssigned />
				<ActionsNavQuickFilters />
				<ActionsNavSimpleSearch />

				<ActionsNavButton
					text="Create Issue"
					action="kaban::issue:create" />

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
	import TicketHighlight from '@/components/TicketHighlight';

	import { mapGetters, mapActions } from 'vuex';

	export default {
		data() {
			return {
				boardView: true
			}
		},
		computed: {
			...mapGetters('boards', {
				getBoard: 'getOne'
			}),

			...mapGetters('tickets', {
				queryTicket: 'query',
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

			openTicketHighlight(ticket) {
				this.$modal.show(
					TicketHighlight,
					{
						//component props
						ticket
					},
					{
						//modal params
						//https://www.npmjs.com/package/vue-js-modal
						width: '75%'
					}, {
						//events
					})
			}
		},
		mounted() {
			this.$bus.$on('kaban::board::draggables', ({tickets, mapsTo}) => {
				this.updateTicketStatus({tickets, mapsTo})
			})

			this.$bus.$on('kaban::board::ticket::selected', (ticket) => {
				this.openTicketHighlight(ticket)
			})
		},
		destroyed() {
			this.$bus.$off('kaban::board::draggables')
			this.$bus.$off('kaban::board::ticket::selected')
		}
	}
</script>
